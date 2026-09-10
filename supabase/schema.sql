create table if not exists public.study_notes (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  ciphertext text not null,
  iv text not null,
  encryption_version integer not null default 1 check (encryption_version > 0),
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists study_notes_user_updated_idx
  on public.study_notes (user_id, updated_at desc);

alter table public.study_notes enable row level security;

drop policy if exists "Users can read their encrypted notes" on public.study_notes;
create policy "Users can read their encrypted notes"
  on public.study_notes
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their encrypted notes" on public.study_notes;
create policy "Users can insert their encrypted notes"
  on public.study_notes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their encrypted notes" on public.study_notes;
create policy "Users can update their encrypted notes"
  on public.study_notes
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their encrypted notes" on public.study_notes;
create policy "Users can delete their encrypted notes"
  on public.study_notes
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.study_notes to authenticated;

comment on table public.study_notes is
  'End-to-end encrypted study notes. Plaintext and encryption passphrases never leave the browser.';

create or replace function public.sync_study_note(
  p_id uuid,
  p_expected_revision integer,
  p_ciphertext text,
  p_iv text,
  p_encryption_version integer,
  p_updated_at timestamptz,
  p_deleted_at timestamptz
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  current_revision integer;
  affected_rows integer;
begin
  select revision
    into current_revision
    from public.study_notes
    where id = p_id and user_id = auth.uid()
    for update;

  if not found then
    if p_expected_revision <> 0 then
      return jsonb_build_object('applied', false, 'revision', 0);
    end if;

    insert into public.study_notes (
      id, user_id, ciphertext, iv, encryption_version, revision, updated_at, deleted_at
    )
    values (
      p_id, auth.uid(), p_ciphertext, p_iv, p_encryption_version, 1, p_updated_at, p_deleted_at
    )
    on conflict (id) do nothing;

    get diagnostics affected_rows = row_count;
    if affected_rows = 1 then
      return jsonb_build_object('applied', true, 'revision', 1, 'updated_at', p_updated_at);
    end if;

    select revision
      into current_revision
      from public.study_notes
      where id = p_id and user_id = auth.uid();
    return jsonb_build_object('applied', false, 'revision', coalesce(current_revision, 0));
  end if;

  if current_revision <> p_expected_revision then
    return jsonb_build_object('applied', false, 'revision', current_revision);
  end if;

  update public.study_notes
    set ciphertext = p_ciphertext,
        iv = p_iv,
        encryption_version = p_encryption_version,
        revision = current_revision + 1,
        updated_at = p_updated_at,
        deleted_at = p_deleted_at
    where id = p_id and user_id = auth.uid();

  return jsonb_build_object(
    'applied', true,
    'revision', current_revision + 1,
    'updated_at', p_updated_at
  );
end;
$$;

revoke all on function public.sync_study_note(
  uuid, integer, text, text, integer, timestamptz, timestamptz
) from public;

grant execute on function public.sync_study_note(
  uuid, integer, text, text, integer, timestamptz, timestamptz
) to authenticated;

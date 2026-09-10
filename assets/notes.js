(() => {
  "use strict";

  const APP_VERSION = 1;
  const DB_NAME = "self-learning-notes";
  const DB_VERSION = 1;
  const NOTES_STORE = "notes";
  const META_STORE = "meta";
  const AUTH_KEY = "study-notes-auth-v1";
  const RUNTIME_CONFIG_KEY = "study-notes-runtime-config-v1";
  const READING_POSITION_KEY = "study-notes-reading-position";
  const PBKDF2_ITERATIONS = 250000;
  const config = window.STUDY_NOTES_CONFIG || {};

  const state = {
    db: null,
    notes: [],
    currentSection: { id: "mfn", title: "学习手册" },
    editorNoteId: null,
    selectedQuote: "",
    selectedSection: null,
    filter: "all",
    query: "",
    panelOpen: false,
    session: null,
    cryptoKey: null,
    syncing: false,
    syncDebounceTimer: null,
    syncInterval: null,
    runtimeConfig: loadRuntimeConfig()
  };

  const elements = {};

  function loadRuntimeConfig() {
    try {
      return JSON.parse(localStorage.getItem(RUNTIME_CONFIG_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function cloudConfig() {
    return {
      url: String(config.supabaseUrl || state.runtimeConfig.supabaseUrl || "").replace(/\/+$/, ""),
      key: String(config.supabaseAnonKey || state.runtimeConfig.supabaseAnonKey || "")
    };
  }

  function hasCloudConfig() {
    const cloud = cloudConfig();
    return /^https:\/\/.+\.supabase\.co$/i.test(cloud.url) && cloud.key.length > 20;
  }

  function createShell() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <button class="notes-launcher" id="notesLauncher" type="button" aria-label="打开学习笔记">
        <span aria-hidden="true">✎</span><span>学习笔记</span>
        <span class="notes-launcher__count" id="notesCount">0</span>
      </button>
      <div class="notes-backdrop" id="notesBackdrop"></div>
      <aside class="notes-panel" id="notesPanel" aria-label="学习笔记侧栏" aria-hidden="true">
        <header class="notes-header">
          <div>
            <h2>我的学习笔记</h2>
            <div class="notes-header__meta" id="currentSectionLabel">当前章节：学习手册</div>
          </div>
          <button class="notes-icon-button" id="notesClose" type="button" aria-label="关闭笔记">✕</button>
        </header>
        <div>
          <div class="notes-toolbar">
            <button class="notes-button notes-button--primary" id="newNoteButton" type="button">＋ 新建</button>
            <button class="notes-button" id="exportMarkdownButton" type="button">导出 MD</button>
            <button class="notes-button" id="exportBackupButton" type="button">备份 JSON</button>
            <button class="notes-button" id="importNotesButton" type="button">导入</button>
            <input id="importNotesFile" type="file" accept=".json,application/json" hidden>
          </div>
          <section class="notes-sync-card" aria-label="云同步">
            <div class="notes-sync-card__row">
              <span class="notes-status" id="syncStatus" data-state="local">仅本机</span>
              <button class="notes-button" id="cloudActionButton" type="button">设置同步</button>
            </div>
            <p id="syncDescription">笔记会保存在当前浏览器。配置 Supabase 后可加密同步到其他设备。</p>
            <div class="notes-auth" id="cloudSetup" hidden>
              <div id="cloudConfigFields">
                <input class="notes-input" id="supabaseUrlInput" type="url" placeholder="Supabase Project URL">
                <input class="notes-input" id="supabaseKeyInput" type="password" placeholder="Supabase anon key">
                <button class="notes-button" id="saveCloudConfigButton" type="button">保存云配置</button>
              </div>
              <div id="cloudLoginFields" hidden>
                <input class="notes-input" id="cloudEmailInput" type="email" autocomplete="email" placeholder="登录邮箱">
                <button class="notes-button" id="sendMagicLinkButton" type="button">发送登录链接</button>
              </div>
              <div id="cloudUnlockFields" hidden>
                <input class="notes-input" id="cloudPassphraseInput" type="password" autocomplete="current-password" placeholder="笔记加密密码">
                <div class="notes-auth__actions">
                  <button class="notes-button notes-button--primary" id="unlockSyncButton" type="button">解锁并同步</button>
                  <button class="notes-button" id="logoutButton" type="button">退出登录</button>
                </div>
                <div class="notes-help">加密密码不会上传。忘记密码将无法解密云端笔记，请妥善保存。</div>
              </div>
              <div id="cloudConnectedFields" hidden>
                <div class="notes-auth__actions">
                  <button class="notes-button notes-button--primary" id="syncNowButton" type="button">立即同步</button>
                  <button class="notes-button" id="lockSyncButton" type="button">锁定</button>
                  <button class="notes-button" id="logoutConnectedButton" type="button">退出登录</button>
                </div>
              </div>
            </div>
          </section>
          <div class="notes-search-row">
            <input class="notes-input" id="notesSearch" type="search" placeholder="搜索笔记或标签">
            <select class="notes-select" id="notesFilter" aria-label="筛选笔记">
              <option value="all">全部章节</option>
              <option value="current">当前章节</option>
            </select>
          </div>
        </div>
        <div></div>
        <div class="notes-content">
          <div class="notes-empty" id="notesEmpty">还没有笔记。选中正文或点击“新建”开始记录。</div>
          <div class="notes-list" id="notesList"></div>
        </div>
      </aside>
      <div class="notes-editor" id="notesEditor" role="dialog" aria-modal="true" aria-labelledby="notesEditorTitle">
        <div class="notes-editor__dialog">
          <header class="notes-editor__header">
            <h3 id="notesEditorTitle">新建笔记</h3>
            <button class="notes-icon-button" id="editorClose" type="button" aria-label="关闭编辑器">✕</button>
          </header>
          <div class="notes-editor__body">
            <div class="notes-field">
              <label>关联章节</label>
              <input class="notes-input" id="noteSectionTitle" type="text" readonly>
            </div>
            <div class="notes-field" id="noteQuoteField" hidden>
              <label>引用原文</label>
              <div class="notes-quote-preview" id="noteQuotePreview"></div>
            </div>
            <div class="notes-field">
              <label for="noteContent">笔记内容</label>
              <textarea class="notes-textarea" id="noteContent" placeholder="写下理解、问题、行动项或待确认事项…"></textarea>
            </div>
            <div class="notes-field">
              <label for="noteTags">标签（用逗号分隔）</label>
              <input class="notes-input" id="noteTags" type="text" placeholder="例如：巴西税务, 待确认">
            </div>
          </div>
          <footer class="notes-editor__footer">
            <button class="notes-button notes-button--danger" id="deleteEditorNote" type="button" hidden>删除</button>
            <div class="notes-editor__footer-group">
              <button class="notes-button" id="cancelNoteButton" type="button">取消</button>
              <button class="notes-button notes-button--primary" id="saveNoteButton" type="button">保存笔记</button>
            </div>
          </footer>
        </div>
      </div>
      <button class="selection-note-button" id="selectionNoteButton" type="button">＋ 选文做笔记</button>
      <div class="notes-toast" id="notesToast" role="status" aria-live="polite"></div>
    `
    );

    [
      "notesLauncher", "notesCount", "notesBackdrop", "notesPanel", "notesClose",
      "currentSectionLabel", "newNoteButton", "exportMarkdownButton", "exportBackupButton", "importNotesButton",
      "importNotesFile", "syncStatus", "syncDescription", "cloudActionButton",
      "cloudSetup", "cloudConfigFields", "supabaseUrlInput", "supabaseKeyInput",
      "saveCloudConfigButton", "cloudLoginFields", "cloudEmailInput",
      "sendMagicLinkButton", "cloudUnlockFields", "cloudPassphraseInput",
      "unlockSyncButton", "logoutButton", "cloudConnectedFields", "syncNowButton",
      "lockSyncButton", "logoutConnectedButton", "notesSearch", "notesFilter",
      "notesEmpty", "notesList", "notesEditor", "notesEditorTitle", "editorClose",
      "noteSectionTitle", "noteQuoteField", "noteQuotePreview", "noteContent",
      "noteTags", "deleteEditorNote", "cancelNoteButton", "saveNoteButton",
      "selectionNoteButton", "notesToast"
    ].forEach((id) => {
      elements[id] = document.getElementById(id);
    });
  }

  function bindEvents() {
    elements.notesLauncher.addEventListener("click", () => setPanel(true));
    elements.notesClose.addEventListener("click", () => setPanel(false));
    elements.notesBackdrop.addEventListener("click", () => setPanel(false));
    elements.newNoteButton.addEventListener("click", () => openEditor());
    elements.editorClose.addEventListener("click", closeEditor);
    elements.cancelNoteButton.addEventListener("click", closeEditor);
    elements.saveNoteButton.addEventListener("click", saveEditorNote);
    elements.deleteEditorNote.addEventListener("click", () => deleteNote(state.editorNoteId));
    elements.notesEditor.addEventListener("click", (event) => {
      if (event.target === elements.notesEditor) closeEditor();
    });
    elements.notesSearch.addEventListener("input", (event) => {
      state.query = event.target.value.trim().toLowerCase();
      renderNotes();
    });
    elements.notesFilter.addEventListener("change", (event) => {
      state.filter = event.target.value;
      renderNotes();
    });
    elements.exportMarkdownButton.addEventListener("click", exportMarkdown);
    elements.exportBackupButton.addEventListener("click", exportBackup);
    elements.importNotesButton.addEventListener("click", () => elements.importNotesFile.click());
    elements.importNotesFile.addEventListener("change", importNotes);
    elements.selectionNoteButton.addEventListener("click", () => {
      hideSelectionButton();
      openEditor(null, state.selectedQuote, state.selectedSection);
    });
    elements.cloudActionButton.addEventListener("click", toggleCloudSetup);
    elements.saveCloudConfigButton.addEventListener("click", saveCloudConfig);
    elements.sendMagicLinkButton.addEventListener("click", sendMagicLink);
    elements.unlockSyncButton.addEventListener("click", unlockCloudSync);
    elements.syncNowButton.addEventListener("click", () => syncNotes(true));
    elements.lockSyncButton.addEventListener("click", lockCloudSync);
    elements.logoutButton.addEventListener("click", logout);
    elements.logoutConnectedButton.addEventListener("click", logout);

    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        openEditor();
      }
      if (event.key === "Escape") {
        if (elements.notesEditor.classList.contains("is-open")) closeEditor();
        else if (state.panelOpen) setPanel(false);
        hideSelectionButton();
      }
    });

    const article = document.querySelector(".paper");
    article?.addEventListener("mouseup", showSelectionButton);
    article?.addEventListener("keyup", showSelectionButton);
    document.addEventListener("mousedown", (event) => {
      if (!elements.selectionNoteButton.contains(event.target)) hideSelectionButton();
    });
    window.addEventListener("scroll", debounce(updateCurrentSection, 120), { passive: true });
    window.addEventListener("hashchange", updateCurrentSection);
    window.addEventListener("online", () => {
      updateCloudUi();
      if (state.cryptoKey) syncNotes(false);
    });
    window.addEventListener("offline", updateCloudUi);
  }

  function setPanel(open) {
    state.panelOpen = open;
    elements.notesPanel.classList.toggle("is-open", open);
    elements.notesBackdrop.classList.toggle("is-visible", open);
    elements.notesPanel.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("notes-open", open);
    if (open) {
      renderNotes();
      elements.notesSearch.focus();
    }
  }

  function openEditor(noteId = null, quote = "", section = null) {
    const note = noteId ? state.notes.find((item) => item.id === noteId) : null;
    const targetSection = note
      ? { id: note.sectionId, title: note.sectionTitle }
      : section || state.currentSection;

    state.editorNoteId = note?.id || null;
    state.selectedQuote = note?.quote || quote || "";
    state.selectedSection = targetSection;
    elements.notesEditorTitle.textContent = note ? "编辑笔记" : "新建笔记";
    elements.noteSectionTitle.value = targetSection.title || "学习手册";
    elements.noteContent.value = note?.content || "";
    elements.noteTags.value = (note?.tags || []).join(", ");
    elements.noteQuotePreview.textContent = state.selectedQuote;
    elements.noteQuoteField.hidden = !state.selectedQuote;
    elements.deleteEditorNote.hidden = !note;
    elements.notesEditor.classList.add("is-open");
    window.setTimeout(() => elements.noteContent.focus(), 30);
  }

  function closeEditor() {
    elements.notesEditor.classList.remove("is-open");
    state.editorNoteId = null;
    state.selectedQuote = "";
    state.selectedSection = null;
  }

  async function saveEditorNote() {
    const content = elements.noteContent.value.trim();
    if (!content && !state.selectedQuote) {
      toast("请先填写笔记内容或选择一段原文。");
      return;
    }

    const now = new Date().toISOString();
    const tags = elements.noteTags.value
      .split(/[,，]/)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 12);
    let note = state.editorNoteId
      ? state.notes.find((item) => item.id === state.editorNoteId)
      : null;

    if (note) {
      note = {
        ...note,
        content,
        tags,
        quote: state.selectedQuote,
        updatedAt: now,
        dirty: true
      };
    } else {
      const section = state.selectedSection || state.currentSection;
      note = {
        id: crypto.randomUUID(),
        sectionId: section.id || "mfn",
        sectionTitle: section.title || "学习手册",
        quote: state.selectedQuote,
        content,
        tags,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        dirty: true,
        remoteRevision: 0,
        remoteUpdatedAt: null
      };
    }

    await putNote(note);
    await reloadNotes();
    closeEditor();
    setPanel(true);
    toast("笔记已保存。");
    scheduleSync();
  }

  async function deleteNote(noteId) {
    if (!noteId) return;
    const note = state.notes.find((item) => item.id === noteId);
    if (!note || !window.confirm("确认删除这条笔记？同步后其他设备也会删除。")) return;
    note.deletedAt = new Date().toISOString();
    note.updatedAt = note.deletedAt;
    note.dirty = true;
    await putNote(note);
    await reloadNotes();
    closeEditor();
    toast("笔记已删除。");
    scheduleSync();
  }

  function renderNotes() {
    const visible = state.notes
      .filter((note) => !note.deletedAt)
      .filter((note) => state.filter !== "current" || note.sectionId === state.currentSection.id)
      .filter((note) => {
        if (!state.query) return true;
        return [
          note.sectionTitle,
          note.content,
          note.quote,
          ...(note.tags || [])
        ].join(" ").toLowerCase().includes(state.query);
      })
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));

    elements.notesList.replaceChildren();
    elements.notesEmpty.hidden = visible.length > 0;
    visible.forEach((note) => elements.notesList.append(createNoteCard(note)));
    elements.notesCount.textContent = String(state.notes.filter((note) => !note.deletedAt).length);
  }

  function createNoteCard(note) {
    const card = document.createElement("article");
    card.className = "note-card";
    card.tabIndex = 0;
    card.dataset.noteId = note.id;
    card.addEventListener("click", () => openEditor(note.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") openEditor(note.id);
    });

    const section = document.createElement("div");
    section.className = "note-card__section";
    section.textContent = note.sectionTitle || "学习手册";
    section.title = "点击后编辑；双击章节标题可跳回原文";
    section.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      jumpToNote(note);
    });

    const body = document.createElement("div");
    body.className = "note-card__body";
    body.textContent = note.content || "（仅引用）";

    card.append(section, body);

    if (note.quote) {
      const quote = document.createElement("div");
      quote.className = "note-card__quote";
      quote.textContent = truncate(note.quote, 180);
      card.append(quote);
    }

    const footer = document.createElement("div");
    footer.className = "note-card__footer";
    const tags = document.createElement("div");
    tags.className = "note-tags";
    (note.tags || []).slice(0, 4).forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "note-tag";
      chip.textContent = tag;
      tags.append(chip);
    });
    const time = document.createElement("span");
    time.textContent = formatDate(note.updatedAt);
    footer.append(tags, time);
    card.append(footer);

    const remove = document.createElement("button");
    remove.className = "note-card__delete";
    remove.type = "button";
    remove.title = "删除";
    remove.textContent = "×";
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteNote(note.id);
    });
    card.append(remove);
    return card;
  }

  function jumpToNote(note) {
    const target = document.getElementById(note.sectionId);
    if (!target) {
      toast("原章节锚点已变化，请使用章节名称搜索。");
      return;
    }
    setPanel(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.classList.add("notes-highlight");
    window.setTimeout(() => target.classList.remove("notes-highlight"), 2300);
  }

  function showSelectionButton() {
    window.setTimeout(() => {
      const selection = window.getSelection();
      const quote = selection?.toString().trim();
      if (!selection || !quote || quote.length < 2 || quote.length > 2000 || selection.rangeCount === 0) {
        hideSelectionButton();
        return;
      }
      const range = selection.getRangeAt(0);
      const article = document.querySelector(".paper");
      if (!article?.contains(range.commonAncestorContainer)) {
        hideSelectionButton();
        return;
      }
      const rect = range.getBoundingClientRect();
      state.selectedQuote = quote;
      state.selectedSection = sectionForNode(range.startContainer);
      elements.selectionNoteButton.style.left = `${Math.min(window.innerWidth - 145, Math.max(10, rect.left + rect.width / 2 - 55))}px`;
      elements.selectionNoteButton.style.top = `${Math.max(10, rect.top - 42)}px`;
      elements.selectionNoteButton.classList.add("is-visible");
    }, 0);
  }

  function hideSelectionButton() {
    elements.selectionNoteButton.classList.remove("is-visible");
  }

  function sectionForNode(node) {
    let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    const article = document.querySelector(".paper");
    if (!element || !article?.contains(element)) return state.currentSection;
    const headings = [...article.querySelectorAll("h1[id],h2[id],h3[id]")];
    let section = headings[0];
    for (const heading of headings) {
      if (heading.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) {
        section = heading;
      } else if (heading === element || heading.contains(element)) {
        section = heading;
        break;
      }
    }
    return headingSection(section);
  }

  function headingSection(heading) {
    if (!heading) return { id: "mfn", title: "学习手册" };
    return {
      id: heading.id || "mfn",
      title: heading.textContent.replace("¶", "").trim()
    };
  }

  function updateCurrentSection() {
    const headings = [...document.querySelectorAll(".paper h1[id],.paper h2[id],.paper h3[id]")];
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 140) current = heading;
      else break;
    }
    const section = headingSection(current);
    if (section.id !== state.currentSection.id) {
      state.currentSection = section;
      elements.currentSectionLabel.textContent = `当前章节：${truncate(section.title, 34)}`;
      if (state.filter === "current") renderNotes();
    }
    if (section.id) localStorage.setItem(READING_POSITION_KEY, section.id);
  }

  function restoreReadingPosition() {
    if (window.location.hash) return;
    const id = localStorage.getItem(READING_POSITION_KEY);
    const target = id ? document.getElementById(id) : null;
    if (target) window.setTimeout(() => target.scrollIntoView(), 80);
  }

  function exportMarkdown() {
    const activeNotes = state.notes.filter((note) => !note.deletedAt);
    if (!activeNotes.length) {
      toast("当前没有可导出的笔记。");
      return;
    }

    const markdown = [
      `# ${config.appName || "学习手册"}笔记`,
      "",
      `导出时间：${new Date().toLocaleString("zh-CN")}`,
      "",
      ...activeNotes
        .sort((a, b) => a.sectionTitle.localeCompare(b.sectionTitle, "zh-CN"))
        .flatMap((note) => [
          `## ${note.sectionTitle}`,
          note.quote ? `> ${note.quote.replace(/\n/g, "\n> ")}` : "",
          note.content,
          note.tags?.length ? `标签：${note.tags.join("、")}` : "",
          `更新时间：${formatDate(note.updatedAt)}`,
          ""
        ].filter(Boolean))
    ].join("\n");

    downloadBlob(markdown, `学习笔记_${dateStamp()}.md`, "text/markdown;charset=utf-8");
    toast("Markdown 笔记已导出。");
  }

  function exportBackup() {
    const activeNotes = state.notes.filter((note) => !note.deletedAt);
    if (!activeNotes.length) {
      toast("当前没有可备份的笔记。");
      return;
    }
    const backup = JSON.stringify({ version: APP_VERSION, exportedAt: new Date().toISOString(), notes: activeNotes }, null, 2);
    downloadBlob(backup, `学习笔记备份_${dateStamp()}.json`, "application/json;charset=utf-8");
    toast("JSON 备份已导出。");
  }

  async function importNotes(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data.notes)) throw new Error("文件中没有 notes 数组");
      let imported = 0;
      for (const candidate of data.notes) {
        if (!candidate.content && !candidate.quote) continue;
        const existing = state.notes.find((note) => note.id === candidate.id);
        const note = {
          id: existing?.id || candidate.id || crypto.randomUUID(),
          sectionId: candidate.sectionId || "mfn",
          sectionTitle: candidate.sectionTitle || "学习手册",
          quote: String(candidate.quote || ""),
          content: String(candidate.content || ""),
          tags: Array.isArray(candidate.tags) ? candidate.tags.map(String) : [],
          createdAt: candidate.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
          dirty: true,
          remoteRevision: existing?.remoteRevision || 0,
          remoteUpdatedAt: existing?.remoteUpdatedAt || null
        };
        await putNote(note);
        imported += 1;
      }
      await reloadNotes();
      toast(`已导入 ${imported} 条笔记。`);
      scheduleSync();
    } catch (error) {
      toast(`导入失败：${error.message}`);
    }
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function toggleCloudSetup() {
    elements.cloudSetup.hidden = !elements.cloudSetup.hidden;
    updateCloudUi();
  }

  function saveCloudConfig() {
    const url = elements.supabaseUrlInput.value.trim().replace(/\/+$/, "");
    const key = elements.supabaseKeyInput.value.trim();
    if (!/^https:\/\/.+\.supabase\.co$/i.test(url) || key.length < 20) {
      toast("请输入有效的 Supabase Project URL 和 anon key。");
      return;
    }
    state.runtimeConfig = { supabaseUrl: url, supabaseAnonKey: key };
    localStorage.setItem(RUNTIME_CONFIG_KEY, JSON.stringify(state.runtimeConfig));
    toast("云同步配置已保存在当前浏览器。");
    updateCloudUi();
  }

  async function sendMagicLink() {
    if (!hasCloudConfig()) return;
    const email = elements.cloudEmailInput.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast("请输入有效邮箱。");
      return;
    }
    setSyncStatus("working", "发送登录链接");
    try {
      const cloud = cloudConfig();
      const redirect = encodeURIComponent(`${window.location.origin}${window.location.pathname}`);
      const response = await fetch(`${cloud.url}/auth/v1/otp?redirect_to=${redirect}`, {
        method: "POST",
        headers: {
          apikey: cloud.key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          create_user: true
        })
      });
      if (!response.ok) throw new Error(await responseText(response));
      toast("登录链接已发送，请在同一浏览器打开邮件链接。");
      setSyncStatus("local", "等待邮箱登录");
    } catch (error) {
      setSyncStatus("error", "登录链接发送失败");
      toast(error.message);
    }
  }

  async function processAuthCallback() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (!accessToken || !refreshToken) return;
    const expiresIn = Number(params.get("expires_in") || 3600);
    const session = {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    state.session = await hydrateSession(session);
    toast("登录成功。请输入笔记加密密码以开始同步。");
  }

  async function loadSession() {
    if (!hasCloudConfig()) return null;
    let stored;
    try {
      stored = JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
    } catch {
      return null;
    }
    if (!stored?.accessToken || !stored?.refreshToken) return null;
    try {
      if (stored.expiresAt && stored.expiresAt < Date.now() + 60000) {
        stored = await refreshSession(stored.refreshToken);
        localStorage.setItem(AUTH_KEY, JSON.stringify(stored));
      }
      return await hydrateSession(stored);
    } catch {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  }

  async function hydrateSession(session) {
    const cloud = cloudConfig();
    const response = await fetch(`${cloud.url}/auth/v1/user`, {
      headers: {
        apikey: cloud.key,
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    if (!response.ok) throw new Error("登录状态已失效");
    const user = await response.json();
    return { ...session, user };
  }

  async function refreshSession(refreshToken) {
    const cloud = cloudConfig();
    const response = await fetch(`${cloud.url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: {
        apikey: cloud.key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    if (!response.ok) throw new Error("无法刷新登录状态");
    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000
    };
  }

  async function unlockCloudSync() {
    if (!state.session?.user) {
      toast("请先完成邮箱登录。");
      return;
    }
    const passphrase = elements.cloudPassphraseInput.value;
    if (passphrase.length < 10) {
      toast("加密密码至少需要 10 个字符。");
      return;
    }
    try {
      state.cryptoKey = await deriveKey(passphrase, state.session.user.id);
      elements.cloudPassphraseInput.value = "";
      updateCloudUi();
      await syncNotes(true);
      startSyncTimer();
    } catch (error) {
      state.cryptoKey = null;
      setSyncStatus("error", "解锁失败");
      toast(`无法解锁云端笔记：${error.message}`);
    }
  }

  function lockCloudSync() {
    state.cryptoKey = null;
    stopSyncTimer();
    updateCloudUi();
    toast("云端笔记已锁定，本机笔记仍可使用。");
  }

  function logout() {
    state.cryptoKey = null;
    state.session = null;
    stopSyncTimer();
    localStorage.removeItem(AUTH_KEY);
    updateCloudUi();
    toast("已退出云同步账号。");
  }

  function updateCloudUi() {
    const configured = hasCloudConfig();
    const loggedIn = Boolean(state.session?.user);
    const unlocked = Boolean(state.cryptoKey);
    const online = navigator.onLine;

    elements.supabaseUrlInput.value = cloudConfig().url;
    elements.supabaseKeyInput.value = cloudConfig().key;
    elements.cloudConfigFields.hidden = configured;
    elements.cloudLoginFields.hidden = !configured || loggedIn;
    elements.cloudUnlockFields.hidden = !configured || !loggedIn || unlocked;
    elements.cloudConnectedFields.hidden = !configured || !loggedIn || !unlocked;

    if (!configured) {
      setSyncStatus("local", "仅本机");
      elements.syncDescription.textContent = "填写 Supabase 项目配置后，可在多设备间端到端加密同步。";
      elements.cloudActionButton.textContent = "设置同步";
    } else if (!online) {
      setSyncStatus("error", "离线");
      elements.syncDescription.textContent = "当前离线，修改会保存在本机并在联网后同步。";
      elements.cloudActionButton.textContent = "同步设置";
    } else if (!loggedIn) {
      setSyncStatus("local", "未登录");
      elements.syncDescription.textContent = "使用邮箱登录后，笔记才能关联到你的云端账号。";
      elements.cloudActionButton.textContent = "登录同步";
    } else if (!unlocked) {
      setSyncStatus("local", "已登录，待解锁");
      elements.syncDescription.textContent = `账号：${state.session.user.email || "已登录"}。输入加密密码后同步。`;
      elements.cloudActionButton.textContent = "解锁同步";
    } else if (!state.syncing) {
      setSyncStatus("synced", "云同步已启用");
      elements.syncDescription.textContent = `账号：${state.session.user.email || "已登录"}。云端仅保存加密后的笔记。`;
      elements.cloudActionButton.textContent = "同步状态";
    }
  }

  function setSyncStatus(status, text) {
    elements.syncStatus.dataset.state = status;
    elements.syncStatus.textContent = text;
  }

  async function syncNotes(showSuccess) {
    if (state.syncing || !navigator.onLine || !hasCloudConfig() || !state.session?.user || !state.cryptoKey) return;
    state.syncing = true;
    setSyncStatus("working", "正在同步");
    try {
      state.session = await ensureFreshSession(state.session);
      const remoteNotes = await fetchRemoteNotes();
      await mergeRemoteNotes(remoteNotes);
      await pushDirtyNotes(remoteNotes);
      await reloadNotes();
      setSyncStatus("synced", "已同步");
      if (showSuccess) toast("所有笔记已完成加密同步。");
    } catch (error) {
      setSyncStatus("error", "同步失败");
      if (showSuccess) toast(`同步失败：${error.message}`);
      console.error("Study notes sync failed", error);
    } finally {
      state.syncing = false;
      updateCloudUi();
      if (state.notes.some((note) => note.dirty)) scheduleSync();
    }
  }

  async function ensureFreshSession(session) {
    if (!session.expiresAt || session.expiresAt >= Date.now() + 60000) return session;
    const refreshed = await refreshSession(session.refreshToken);
    localStorage.setItem(AUTH_KEY, JSON.stringify(refreshed));
    return hydrateSession(refreshed);
  }

  async function fetchRemoteNotes() {
    const response = await supabaseRequest(
      "/rest/v1/study_notes?select=id,ciphertext,iv,encryption_version,revision,updated_at,deleted_at&order=updated_at.asc"
    );
    return response.json();
  }

  async function mergeRemoteNotes(remoteNotes) {
    for (const remote of remoteNotes) {
      const local = await getNote(remote.id);
      const remoteRevision = Number(remote.revision || 0);
      if (local?.dirty && remoteRevision <= Number(local.remoteRevision || 0)) {
        continue;
      }
      const payload = await decryptPayload(remote);
      const latestLocal = await getNote(remote.id);
      if (latestLocal?.dirty && remoteRevision <= Number(latestLocal.remoteRevision || 0)) {
        continue;
      }
      if (latestLocal?.dirty) await createConflictCopy(latestLocal);
      if (latestLocal && remoteRevision <= Number(latestLocal.remoteRevision || 0)) continue;
      const merged = {
        ...payload,
        id: remote.id,
        deletedAt: remote.deleted_at || payload.deletedAt || null,
        dirty: false,
        remoteRevision,
        remoteUpdatedAt: remote.updated_at
      };
      await putNote(merged);
    }
  }

  async function pushDirtyNotes(remoteNotes) {
    await reloadNotes(false);
    const remoteMap = new Map(remoteNotes.map((note) => [note.id, note]));
    const dirty = state.notes.filter((note) => note.dirty);
    for (const note of dirty) {
      const expectedRevision = Math.max(
        Number(remoteMap.get(note.id)?.revision || 0),
        Number(note.remoteRevision || 0)
      );
      const snapshotUpdatedAt = note.updatedAt;
      const encrypted = await encryptPayload(note);
      const response = await supabaseRequest("/rest/v1/rpc/sync_study_note", {
        method: "POST",
        body: JSON.stringify({
          p_id: note.id,
          p_expected_revision: expectedRevision,
          p_ciphertext: encrypted.ciphertext,
          p_iv: encrypted.iv,
          p_encryption_version: APP_VERSION,
          p_updated_at: note.updatedAt,
          p_deleted_at: note.deletedAt
        })
      });
      const result = await response.json();
      if (!result.applied) {
        await resolveUploadConflict(note.id);
        continue;
      }
      const latestLocal = await getNote(note.id);
      if (latestLocal && latestLocal.updatedAt === snapshotUpdatedAt && latestLocal.dirty) {
        await putNote({
          ...latestLocal,
          dirty: false,
          remoteRevision: Number(result.revision),
          remoteUpdatedAt: result.updated_at || snapshotUpdatedAt
        });
      }
    }
  }

  async function resolveUploadConflict(noteId) {
    const latestLocal = await getNote(noteId);
    if (latestLocal?.dirty) await createConflictCopy(latestLocal);
    const remote = await fetchRemoteNote(noteId);
    if (!remote) return;
    const payload = await decryptPayload(remote);
    await putNote({
      ...payload,
      id: remote.id,
      deletedAt: remote.deleted_at || payload.deletedAt || null,
      dirty: false,
      remoteRevision: Number(remote.revision || 0),
      remoteUpdatedAt: remote.updated_at
    });
  }

  async function createConflictCopy(note) {
    await putNote({
      ...note,
      id: crypto.randomUUID(),
      content: `${note.content}\n\n[冲突副本：另一台设备也修改了原笔记]`,
      updatedAt: new Date().toISOString(),
      dirty: true,
      remoteRevision: 0,
      remoteUpdatedAt: null
    });
  }

  async function fetchRemoteNote(noteId) {
    const response = await supabaseRequest(
      `/rest/v1/study_notes?select=id,ciphertext,iv,encryption_version,revision,updated_at,deleted_at&id=eq.${encodeURIComponent(noteId)}&limit=1`
    );
    return (await response.json())[0] || null;
  }

  async function supabaseRequest(path, options = {}) {
    const cloud = cloudConfig();
    const response = await fetch(`${cloud.url}${path}`, {
      ...options,
      headers: {
        apikey: cloud.key,
        Authorization: `Bearer ${state.session.accessToken}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(await responseText(response));
    return response;
  }

  async function responseText(response) {
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return json.msg || json.message || json.error_description || json.error || text;
    } catch {
      return text || `HTTP ${response.status}`;
    }
  }

  function scheduleSync() {
    if (!state.cryptoKey) return;
    window.clearTimeout(state.syncDebounceTimer);
    state.syncDebounceTimer = window.setTimeout(() => syncNotes(false), 900);
  }

  function startSyncTimer() {
    stopSyncTimer();
    state.syncInterval = window.setInterval(() => syncNotes(false), 60000);
  }

  function stopSyncTimer() {
    if (state.syncDebounceTimer) window.clearTimeout(state.syncDebounceTimer);
    if (state.syncInterval) window.clearInterval(state.syncInterval);
    state.syncDebounceTimer = null;
    state.syncInterval = null;
  }

  async function deriveKey(passphrase, userId) {
    const encoder = new TextEncoder();
    const salt = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(`self-learning-notes:v1:${userId}`)
    );
    const material = await crypto.subtle.importKey(
      "raw",
      encoder.encode(passphrase),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function encryptPayload(note) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const payload = {
      id: note.id,
      sectionId: note.sectionId,
      sectionTitle: note.sectionTitle,
      quote: note.quote,
      content: note.content,
      tags: note.tags,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      deletedAt: note.deletedAt
    };
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      state.cryptoKey,
      new TextEncoder().encode(JSON.stringify(payload))
    );
    return {
      ciphertext: bytesToBase64(new Uint8Array(encrypted)),
      iv: bytesToBase64(iv)
    };
  }

  async function decryptPayload(remote) {
    try {
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: base64ToBytes(remote.iv) },
        state.cryptoKey,
        base64ToBytes(remote.ciphertext)
      );
      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch {
      throw new Error("加密密码不正确，或云端笔记数据已损坏");
    }
  }

  function bytesToBase64(bytes) {
    let binary = "";
    const chunk = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunk) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk));
    }
    return btoa(binary);
  }

  function base64ToBytes(value) {
    const binary = atob(value);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(NOTES_STORE)) {
          const notes = db.createObjectStore(NOTES_STORE, { keyPath: "id" });
          notes.createIndex("updatedAt", "updatedAt");
          notes.createIndex("sectionId", "sectionId");
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: "key" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function idbRequest(storeName, mode, operation) {
    return new Promise((resolve, reject) => {
      const transaction = state.db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function putNote(note) {
    return idbRequest(NOTES_STORE, "readwrite", (store) => store.put(note));
  }

  function getNote(noteId) {
    return idbRequest(NOTES_STORE, "readonly", (store) => store.get(noteId));
  }

  async function reloadNotes(render = true) {
    state.notes = await idbRequest(NOTES_STORE, "readonly", (store) => store.getAll());
    if (render) renderNotes();
  }

  function formatDate(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function dateStamp() {
    const date = new Date();
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  }

  function truncate(value, length) {
    const text = String(value || "");
    return text.length > length ? `${text.slice(0, length - 1)}…` : text;
  }

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn(...args), delay);
    };
  }

  let toastTimer;
  function toast(message) {
    elements.notesToast.textContent = message;
    elements.notesToast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => elements.notesToast.classList.remove("is-visible"), 3600);
  }

  async function initialize() {
    createShell();
    bindEvents();
    try {
      state.db = await openDatabase();
      await reloadNotes();
    } catch (error) {
      toast(`无法打开本地笔记库：${error.message}`);
    }
    await processAuthCallback();
    if (!state.session) state.session = await loadSession();
    updateCloudUi();
    updateCurrentSection();
    restoreReadingPosition();
    if ("serviceWorker" in navigator && window.location.protocol === "https:") {
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("Service worker registration failed", error);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();

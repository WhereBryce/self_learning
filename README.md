# MFN 跨境物流学习手册

巴西为主、墨西哥为辅的 Amazon Global Selling MFN/FBM 跨境物流学习网站。

## 在线功能

- 固定章节目录和目录搜索
- 阅读位置记忆
- 右侧学习笔记栏
- 选中文字直接创建关联笔记
- 标签、搜索和章节筛选
- IndexedDB 本地离线存储
- Markdown 与 JSON 备份导出
- JSON 备份恢复
- Supabase 邮箱登录
- AES-GCM 浏览器端加密
- 多设备云同步和冲突副本保护
- Service Worker 离线阅读

## 本地运行

浏览器的加密、IndexedDB 和 Service Worker 功能需要通过 HTTP/HTTPS 访问：

```powershell
python -m http.server 8000
```

然后打开：

```text
http://localhost:8000/
```

## 启用跨设备同步

GitHub Pages 是静态网站，跨设备同步使用 Supabase Auth 和 PostgreSQL。云端只保存 AES-GCM 加密后的密文，笔记加密密码不会上传。

### 1. 创建 Supabase 项目

在 Supabase 创建项目后，进入 **SQL Editor**，执行：

```text
supabase/schema.sql
```

该脚本会创建 `study_notes` 表，并通过 Row Level Security（RLS）限制用户只能访问自己的数据。

### 2. 配置登录回调

在 Supabase 控制台打开：

```text
Authentication → URL Configuration
```

设置：

```text
Site URL:
https://wherebryce.github.io/self_learning/

Redirect URLs:
https://wherebryce.github.io/self_learning/
http://localhost:8000/
```

确保 Email 登录已启用。使用 Magic Link 时，用户会通过邮件完成登录。

### 3. 配置公开项目参数

编辑 `assets/config.js`：

```js
window.STUDY_NOTES_CONFIG = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY",
  appName: "MFN 跨境物流学习手册",
  schemaVersion: 1
});
```

`anon key` 是 Supabase 为浏览器客户端设计的公开密钥；安全边界来自 RLS。严禁把 `service_role` key、数据库密码或其他管理员凭证提交到仓库。

如果仓库中的配置仍为空，也可以在网页的“设置同步”区域临时输入 Project URL 和 anon key。该配置只保存在当前浏览器，因此正式使用时建议提交公开配置。

### 4. 首次登录和加密密码

1. 打开笔记侧栏。
2. 输入邮箱并发送登录链接。
3. 在同一浏览器打开邮件中的链接。
4. 输入一个至少 10 个字符的笔记加密密码。
5. 在其他设备登录后输入同一个加密密码。

加密密码用于在浏览器中通过 PBKDF2 派生 AES-GCM 密钥。服务器无法恢复该密码；忘记密码将无法解密云端笔记。请定期使用“导出”保存 JSON 备份。

## 同步和冲突规则

- 所有编辑先写入本地 IndexedDB。
- 联网且解锁后，修改会自动加密上传。
- 每 60 秒检查一次云端更新，也可以手动同步。
- 两台设备同时修改同一条笔记时，保留本地内容为“冲突副本”，避免静默覆盖。
- 删除采用云端软删除，其他设备同步后隐藏该笔记。

## 安全边界

- 云端只存储 `ciphertext`、初始化向量、版本号和时间戳。
- 笔记正文、引用和标签在浏览器内加密。
- 加密密码不进入 Local Storage、IndexedDB 或云端。
- Supabase `service_role` key 不得用于前端。
- 本地 IndexedDB 为离线体验保存可读副本，因此应保护设备账号和浏览器资料。

## 发布

推送到 `main` 后，`.github/workflows/pages.yml` 会部署 GitHub Pages：

```text
https://wherebryce.github.io/self_learning/
```

如果首次工作流提示 Pages 尚未启用，在仓库 **Settings → Pages → Source** 中选择 **GitHub Actions** 后重新运行工作流。

## 内容版本

- 手册资料截点：2026-09-09
- 网站和笔记架构：2026-09-10
- 法规与税率会变化，正式业务决策必须复核最新官方及内部资料。

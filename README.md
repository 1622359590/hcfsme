# 香港中小企業工商聯合會網站

港中聯網站重建項目。內容參考現有網站 `https://www.hcfsme.org/` 及最新提供的商會簡介、核心服務體系、網絡菜單改版、組織架構文檔，以多頁式 React/Vite 站點呈現首頁、關於港中聯、商會服務、商會活動、會員服務、資訊中心、資源下載與聯絡頁。

## 技術棧

- React 19
- Vite 7
- Phosphor Icons
- GSAP + ScrollTrigger
- 原生 CSS 響應式布局

## 本地開發

```bash
npm install
npm run dev
```

開發服務預設地址：

```text
http://localhost:5173/
```

## 構建

```bash
npm run build
```

構建輸出位於 `dist/`，該目錄不提交到 Git。

## 簡易後台

本項目已內置一個輕量 Node 後台，適合部署到自有服務器。後台使用本地 JSON 文件保存資料，不依賴外部數據庫。

先構建前台：

```bash
npm run build
```

再啟動前後台一體服務：

```bash
ADMIN_PASSWORD="請換成強密碼" PORT=8787 npm run serve
```

`ADMIN_PASSWORD` 需要至少 8 位，並同時包含字母和數字。建議正式部署時同時設置 `ADMIN_TOKEN_SECRET`。

訪問地址：

```text
http://localhost:8787/
http://localhost:8787/admin
```

後台目前支持：

- 管理新聞：新增、編輯、刪除新聞。
- 圖片上傳：在新聞表單中點擊「上傳圖片」按鈕，上傳 PNG、JPG、WEBP、GIF 圖片。
- 頁面管理：以簡易 CMS 方式按頁面修改首屏標題、副標題、頭圖，並直接顯示及編輯該頁正在使用的前台內容模組，例如商會簡介、會董名錄、商會服務、商會活動卡片、會員權益、資源下載等；也可追加內容區塊、要點列表與圖片，並使用上移 / 下移調整排序。
- 全站設定管理：以表單方式編輯聯絡方式、商會簡介文案、會董名錄、管理團隊、五大核心服務、會員權益、資源下載等常用內容，不需要編輯 JSON。
- 入會預登記：查看前台 `/application` 表單提交記錄。
- 中英文後台：登入頁和後台管理頁可切換中文 / English。
- 前台內容讀取：優先讀取後台新聞與內容配置，後台不可用時回退到本地默認資料。

運行資料存放於 `data/store.json`，上傳圖片存放於 `data/uploads/`，這些文件不提交到 Git。部署時請定期備份 `data/` 目錄；如後續資料量增加，可再升級為 MySQL、PostgreSQL 或其他數據庫。

## 頁面結構

- `/`：首頁
- `/about`：關於港中聯
- `/intro`：商會簡介
- `/charter`：商會章程
- `/structure`：組織架構
- `/directors`：會董暨名譽職務
- `/services`：商會服務
- `/industry`：行業委員會
- `/activities`：商會活動
- `/news`：新聞動態
- `/photo`：商會相冊
- `/member-services`：會員服務
- `/member-benefits`：會員類別及權益
- `/membership`：入會須知
- `/application`：線上入會預登記
- `/agreement`：會員服務協議
- `/certification`：實名認證協議
- `/protection`：資訊保護政策
- `/resources`：資訊中心
- `/announcements`：公告
- `/downloads`：資源下載
- `/contact`：聯絡我們
- `/subscribe`：訂閱我們
- `/admin`：網站後台

## 內容與資源

目前頁面內容按港中聯現站導航及新增 Word 文檔逐頁整理。`關於港中聯` 使用新版商會簡介與章程摘要；`商會服務` 已整理為五大核心服務體系；`組織架構` 展示治理層級、應屆執行委員會與六大產業板塊；`會員服務` 補充會員權益、入會須知、線上預登記與協議政策入口。圖片資源使用現站公開圖片 URL。協議與政策類頁面已整理為可讀版章節，後續可按需要補充為全文逐字版本。

## 動畫

站點使用 GSAP 製作一組克制的機構站動效：

- 首屏按導航、標籤、標題、說明、按鈕與圖片分段進場，節奏參考視頻分鏡的時間層次。
- 區塊、服務詳情、卡片、新聞、會董、行業圖示使用 ScrollTrigger 批量 stagger reveal。
- 頁面圖片使用低幅度 scroll-linked 視差，避免影響閱讀。
- 按鈕、導航、下拉菜單、後台面板與卡片補充微交互反饋。
- 所有動畫尊重 `prefers-reduced-motion: reduce`，並優先只動畫 `transform` 與 `opacity` 以降低性能風險。

## 發布流程

本倉庫遠端：

```text
https://github.com/1622359590/hcfsme.git
```

每次修改後默認執行：

```bash
npm run build
git add <changed-files>
git commit -m "<summary>"
git push
```

## GitHub 自動部署到服務器

推薦使用 GitHub Actions 通過 SSH 自動部署。流程是：本地修改後 push 到 `main`，GitHub Actions 登入服務器，拉取最新代碼，安裝依賴，構建前台，並用 PM2 重啟 Node 服務。

### 1. 服務器準備

在服務器上安裝 Node.js、Git 和 PM2：

```bash
npm install -g pm2
```

首次創建部署目錄與環境變量文件：

```bash
mkdir -p /www/wwwroot/hcfsme
cd /www/wwwroot/hcfsme

cat > .env.production <<'EOF'
PORT=8787
ADMIN_PASSWORD=請換成8位以上且包含字母和數字的密碼
ADMIN_TOKEN_SECRET=請換成一串更長的隨機密鑰
DATA_FILE=./data/store.json
UPLOAD_DIR=./data/uploads
EOF
```

`data/store.json` 和 `data/uploads/` 是後台資料與上傳圖片，部署時會保留在服務器上，不會提交到 Git。

### 2. 配置 GitHub Secrets

到 GitHub 倉庫 `Settings -> Secrets and variables -> Actions -> New repository secret` 添加：

```text
SERVER_HOST      服務器 IP 或域名
SERVER_USER      SSH 用戶名，例如 root
SERVER_PORT      SSH 端口，默認 22 可留空
SERVER_SSH_KEY   SSH 私鑰內容
DEPLOY_PATH      服務器部署目錄，例如 /www/wwwroot/hcfsme
```

`SERVER_SSH_KEY` 對應的公鑰需要提前加入服務器的 `~/.ssh/authorized_keys`。

### 3. 觸發部署

推送到 `main` 即可自動部署：

```bash
git add -A
git commit -m "Update site"
git push origin main
```

也可以在 GitHub 的 `Actions -> Deploy to server -> Run workflow` 手動觸發。

### 4. Nginx 反向代理示例

如果使用 Nginx，將域名代理到 Node 服務端口：

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:8787;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## 維護約定

- 每次功能或內容修改後同步更新 README 中相關說明。
- 新增頁面時同步補充「頁面結構」。
- 不提交 `node_modules/`、`dist/` 等生成物。

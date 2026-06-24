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

訪問地址：

```text
http://localhost:8787/
http://localhost:8787/admin
```

後台目前支持：

- 管理新聞：新增、編輯、刪除新聞。
- 入會預登記：查看前台 `/application` 表單提交記錄。
- 前台新聞頁：優先讀取後台新聞資料，後台不可用時回退到本地默認資料。

運行資料存放於 `data/store.json`，該文件不提交到 Git。部署時請定期備份此文件；如後續資料量增加，可再升級為 MySQL、PostgreSQL 或其他數據庫。

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

- 首屏標題、文案、圖片依序進場。
- 區塊在滾動進入視窗時淡入上移。
- 卡片、新聞、會董、行業圖示使用批量 stagger reveal。
- 頁面圖片有輕微 scroll-linked 視差。
- 所有動畫尊重 `prefers-reduced-motion: reduce`，並只動畫 `transform` 與 `opacity` 以降低性能風險。

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

## 維護約定

- 每次功能或內容修改後同步更新 README 中相關說明。
- 新增頁面時同步補充「頁面結構」。
- 不提交 `node_modules/`、`dist/` 等生成物。

# 香港中小企業工商聯合會網站

港中聯網站重建項目。內容參考現有網站 `https://www.hcfsme.org/`，以多頁式 React/Vite 站點呈現首頁、商會介紹、服務、新聞、相冊、會員服務、協議政策與聯絡頁。

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

## 頁面結構

- `/`：首頁
- `/about`：關於商會
- `/intro`：商會簡介
- `/structure`：商會架構
- `/directors`：會董名錄
- `/services`：商會服務
- `/industry`：行業委員會
- `/news`：新聞動態
- `/photo`：商會相冊
- `/member-services`：會員服務
- `/membership`：入會須知
- `/agreement`：會員服務協議
- `/certification`：實名認證協議
- `/protection`：信息保護政策
- `/contact`：聯系我們
- `/subscribe`：訂閱我們

## 內容與資源

目前頁面內容按港中聯現站導航逐頁整理，`關於商會`、`商會簡介`、`商會架構`、`會董名錄`、`商會服務`、`行業委員會` 等頁面各自保留原站頁面重點內容。圖片資源使用現站公開圖片 URL。協議與政策類頁面已整理為可讀版章節，後續可按需要補充為全文逐字版本。

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

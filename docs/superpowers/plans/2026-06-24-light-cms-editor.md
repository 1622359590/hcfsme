# Light CMS Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first usable version of a lightweight CMS page editor, including editable `商會活動` cards.

**Architecture:** Keep the existing JSON-backed admin API. Extend the frontend content model with `activities`, render `/activities` from saved content with defaults, and reorganize the admin page editor into page modules plus custom blocks. Use up/down ordering controls instead of freeform drag-and-drop for this version.

**Tech Stack:** React/Vite in `src/main.jsx`, CSS in `src/styles.css`, Node HTTP server in `server.mjs`, project docs in `README.md`.

---

### Task 1: Add Activities Content Model

**Files:**
- Modify: `src/main.jsx`
- Modify: `server.mjs`

- [ ] **Step 1: Add default activity cards in frontend state**

Add a `defaultActivities` array near the existing content constants in `src/main.jsx`, using the current four hard-coded cards.

- [ ] **Step 2: Merge activities into editable content**

Update `defaultEditableContent` and `mergeEditableContent()` so `content.activities` is always an array with fallback defaults.

- [ ] **Step 3: Add server seed activities**

Update `seedContent` in `server.mjs` with the same default activities so a fresh server store has the CMS content available.

### Task 2: Render Activities Page From CMS Data

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Pass content into `ActivitiesPage`**

Change the app route for `/activities` to render `<ActivitiesPage navigate={navigate} content={content} />`.

- [ ] **Step 2: Replace hard-coded card array**

Inside `ActivitiesPage`, render `(content.activities || defaultActivities)` and support `title`, `summary`, `imageUrl`, `buttonLabel`, and `url`.

- [ ] **Step 3: Preserve current fallback images and links**

If a card is missing an image, use the current `image.news[index % image.news.length]`. If missing `url`, fall back to `/news`.

### Task 3: Add CMS Card Editor For Activities

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Add admin copy strings**

Add labels for `pageManagement`, `activitiesSettings`, `cardsSettings`, `buttonLabel`, `linkUrl`, `moveUp`, `moveDown`, and `previewPage` in Chinese and English admin copy.

- [ ] **Step 2: Add repeated card update helpers**

Create helpers to update, add, remove, and move items in an array key such as `activities`.

- [ ] **Step 3: Add `renderCardsEditor()`**

Build a reusable card-list editor with title, summary textarea, image URL, upload button, button label, URL, move up, move down, and delete controls.

- [ ] **Step 4: Wire `/activities` into page-specific editor**

Update `renderPageSpecificEditor()` so selecting `/activities` displays the activities card editor.

### Task 4: Improve Page Management UX

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Rename page tab surface**

Use `頁面管理` / `Page management` wording for the page editor while keeping the same tab key.

- [ ] **Step 2: Add selected page header and preview action**

At the top of the editor panel, show selected page name, path, and a button to open/preview that page.

- [ ] **Step 3: Reorder editor sections**

Show hero, frontend modules, and custom blocks in a clearer CMS sequence.

- [ ] **Step 4: Style module cards and item actions**

Add CSS for item action rows, compact module headers, and better card editor spacing.

### Task 5: Add Custom Block Ordering

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Add page block move helper**

Create `movePageBlock(path, index, direction)` to reorder `contentForm.pages[path].blocks`.

- [ ] **Step 2: Add move buttons to custom blocks**

Add `上移` and `下移` controls beside delete for each custom block.

### Task 6: Documentation And Verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README admin feature list**

Document that `頁面管理` now exposes page modules, activity cards, image upload, and up/down ordering.

- [ ] **Step 2: Build check**

Run `npm run build`. Expected: exit 0.

- [ ] **Step 3: Server syntax check**

Run `node --check server.mjs`. Expected: exit 0.

- [ ] **Step 4: Commit and push**

Commit the implementation and push to `origin main`.

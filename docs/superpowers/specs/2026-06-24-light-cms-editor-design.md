# Light CMS Editor Design

## Context

The current admin has grown from a simple news editor into several separate content areas: news, page content, site settings, and applications. Some frontend sections are editable, but others are still hard-coded. The most visible gap is the `商會活動` page: it displays activity cards on the public site, but the admin does not expose those cards as editable content.

For a non-technical chamber staff user, the current split is too difficult to reason about. They should not need to know whether content lives in a page object, a global settings object, or a hard-coded React component. They should choose a page, see the page sections that appear on the frontend, edit them, upload images, reorder them, and save.

## Goal

Create a lightweight CMS-style page editor for the admin:

- Make every major public page visible in one `頁面管理` area.
- Show the actual editable content blocks for the selected page.
- Add first-class editable support for `商會活動`.
- Let staff add, remove, reorder, and edit page blocks without touching code.
- Keep the UI familiar and stable instead of building a full visual page builder.

## Non-Goals

- Do not build a Webflow-style freeform canvas.
- Do not support arbitrary CSS, custom HTML, or drag-anywhere layout editing.
- Do not introduce a database in this phase; continue using the current JSON-backed Node admin.
- Do not replace the existing website design system.

## Recommended Approach

Use a structured block editor.

The admin will have a `頁面管理` tab that behaves like a simple CMS:

1. Left side: page list and optional page search/filter.
2. Right side: selected page editor.
3. Editor sections:
   - Page status/metadata.
   - Hero block.
   - Frontend content modules.
   - Custom blocks.
   - Page preview shortcut.
4. Each block has familiar controls:
   - Edit text fields.
   - Upload image button.
   - Button label and URL where relevant.
   - Move up / move down.
   - Delete where safe.
   - Add block from a small set of block types.

This is simpler and more reliable than a freeform visual builder while still giving staff the control they actually need.

## Admin Information Architecture

The top admin tabs should become:

- `新聞管理`: Create, edit, delete news and news images.
- `頁面管理`: Edit all public page content and page-specific blocks.
- `媒體庫`: View uploaded images and copy/select image URLs. This can start as a simple uploaded image list if time is tight.
- `入會記錄`: View frontend membership/application submissions.
- `全站設定`: Global information only, such as contact information, admin language, and admin password/settings controls that are not tied to one public page.

The current `頁面內容` and much of `全站設定` should be consolidated. Content that appears on a specific frontend page belongs in `頁面管理`. Truly global information remains in `全站設定`.

## Page Coverage

The page editor should list all major public pages:

- `/`
- `/about`
- `/intro`
- `/charter`
- `/structure`
- `/directors`
- `/services`
- `/industry`
- `/activities`
- `/news`
- `/photo`
- `/member-services`
- `/member-benefits`
- `/membership`
- `/application`
- `/resources`
- `/announcements`
- `/downloads`
- `/contact`
- `/subscribe`

Some pages may initially expose only hero and custom blocks if they do not have structured data yet. Important business pages must expose their real content modules.

## Block Types

Start with these block types:

- `hero`: title, subtitle, image.
- `text`: kicker, title, body.
- `cards`: repeated cards with title, summary, image, button label, URL.
- `people`: repeated people profiles with name, role, image.
- `services`: repeated service groups with title, value statement, bullet items.
- `downloads`: repeated download links with title, summary, URL.
- `contact`: email, phone, address, office entries.
- `image`: image, caption, optional link.

The UI does not need to expose raw block type names to staff. It can use labels such as `首屏`, `圖文區塊`, `卡片列表`, `人物名錄`, `服務內容`, `下載項目`, `聯絡資料`, `圖片區塊`.

## Activities Page

`商會活動` should become editable in the admin.

Initial data model:

```json
{
  "activities": [
    {
      "title": "近期活動預告",
      "summary": "培訓、研討會、考察團、接待來訪團及政府機構交流安排。",
      "imageUrl": "...",
      "buttonLabel": "查看入口",
      "url": "/subscribe"
    },
    {
      "title": "活動回顧",
      "summary": "按年度整理活動圖文、影音與新聞稿，呈現商會服務軌跡。",
      "imageUrl": "...",
      "buttonLabel": "查看入口",
      "url": "/news"
    }
  ]
}
```

Frontend `/activities` should render from this editable content, with fallback to current defaults.

## Editing Experience

The page editor should reduce clutter:

- The selected page title stays visible at the top.
- The page list should feel like navigation, not a form field dump.
- Each block should be collapsed by default after the hero for long pages, or use compact headers with obvious edit affordances.
- Add/move/delete actions should use clear buttons and short confirmations only for destructive deletes.
- Image fields should prioritize an `上傳圖片` button. URL input can remain as an advanced fallback.

## Data Flow

Keep the current flow:

- Public frontend calls `/api/content`.
- Admin loads `/api/admin/content`.
- Admin saves with `/api/admin/content`.
- Uploaded images go through the current upload endpoint.

Extend the content shape with page-specific modules:

```json
{
  "pages": {
    "/activities": {
      "title": "商會活動",
      "subtitle": "近期活動、年度盛事、交流考察與活動回顧",
      "imageUrl": "...",
      "blocks": []
    }
  },
  "activities": []
}
```

Existing keys such as `aboutContent`, `coreServices`, `directorProfiles`, `memberBenefits`, `downloads`, and `contact` can remain for compatibility, but the admin presentation should group them under the page where they appear.

## Error Handling

- If content save fails, keep edited fields in the form and show a clear error message.
- If image upload fails, keep the existing image URL and show upload failure feedback.
- If a block is empty, show an empty-state prompt rather than a blank card.
- If content data is missing or malformed, normalize it with defaults before rendering.

## Accessibility

- All controls must be keyboard accessible.
- Move up/down buttons must have text labels, not icon-only controls.
- Form labels must remain visible.
- Focus states must remain clear.
- Reordering must work without drag and drop; drag can be added later as progressive enhancement.

## Testing And Verification

Minimum verification:

- Build passes with `npm run build`.
- Server syntax passes with `node --check server.mjs`.
- Admin login still works.
- `/admin` page management loads all major pages.
- `/activities` content can be edited, saved, reloaded, and reflected on the frontend.
- Image upload still works for hero and card images.
- Existing news management still works.
- Existing member application records still load.

## Implementation Notes

The current `src/main.jsx` is doing too much. During implementation, prefer extracting small local helpers/components inside the same file only if that keeps the change safer. If the editor becomes too large, split admin editor components into focused files under `src/` in a follow-up step.

The first implementation should focus on a dependable editor and complete content coverage. Drag-and-drop can be a later enhancement after up/down ordering is stable.

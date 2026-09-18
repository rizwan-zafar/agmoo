# Module: Admin

## What it does

Staff control room for catalog, COD orders, guides, and contact inbox.

Visual system: ink sidebar, cyan active states, wide main column (no 1120px cap), toolbar + white panels on list pages.

Pages:

- `/admin` — dashboard (stats, shortcuts, recent orders, attention: pending / unread / low stock).
- `/admin/products` — list, add, edit, activate/deactivate, delete.
- `/admin/categories` — list and modal create/edit.
- `/admin/orders` — list, detail, status, receipt download.
- `/admin/blogs` — guides CRUD / publish.
- `/admin/messages` — contact inbox.
- `/admin/login` — staff sign-in.

Sidebar badges: pending orders and unread messages. Top bar: View store.

## Key files

- `app/admin/` (all pages)
- `components/admin/AdminShell.jsx`
- `components/admin/AdminSidebar.jsx`
- `components/admin/StatCard.jsx`
- `components/admin/ProductForm.jsx`
- `components/admin/BlogForm.jsx`
- `components/admin/ImageUploader.jsx`
- Admin CSS in `app/globals.css` (`.admin-*`)

## Rules to keep

- Inner pages must match dashboard chrome (toolbar, `.admin-panel`, `.admin-desk`).
- On large screens, content fills the space beside the sidebar.
- Do not show the storefront navbar/footer on `/admin`.
- Uploads go through `/api/upload`.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

# Module: API

## What it does

Next.js App Router Route Handlers under `app/api/`.

| Path | Role |
| --- | --- |
| `/api/products` | Public list; admin `all=true` includes inactive |
| `/api/products/[id]` | Admin update/delete |
| `/api/categories` | Public / admin category CRUD |
| `/api/orders` | Create COD order (public); admin list |
| `/api/orders/[id]` | Admin get/patch status |
| `/api/orders/[id]/receipt` | HTML/PDF-style receipt download |
| `/api/blogs` | Public published; admin all |
| `/api/contact` | Public POST; admin list/read/delete |
| `/api/auth/*` | Admin login / logout / me |
| `/api/upload` | Admin image upload to `public/` |
| `/api/dashboard` | Admin stats JSON (dashboard page also queries Prisma directly) |

## Key files

- `app/api/**/route.js`
- `lib/validation.js`
- `lib/auth.js`

## Rules to keep

- Admin mutations require session.
- Validate with `lib/validation.js` (no extra schema library).
- Return JSON errors the admin UI can toast.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

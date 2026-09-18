# Module: Auth

## What it does

Admin-only sessions. Storefront stays guest.

- Login at `/admin/login` posts to `/api/auth/login`.
- JWT in httpOnly cookie `ss_admin_session`.
- `proxy.js` blocks `/admin/*` except login; logged-in users hitting login go to `/admin`.
- API routes also check `getAdminSessionFromRequest`.
- Logout: `/api/auth/logout`.

Default seed admin: `admin@agmoo.com` / `Admin@123` (from env).

## Key files

- `lib/auth.js`
- `proxy.js`
- `app/admin/login/page.jsx`
- `app/api/auth/login/route.js`
- `app/api/auth/logout/route.js`
- `app/api/auth/me/route.js`

## Rules to keep

- Protect every admin page and mutating admin API.
- Do not add customer accounts unless requested.
- Cookie name is `ss_admin_session`.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

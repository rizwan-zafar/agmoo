# Module: Auth

## What it does

Admin sessions for `/admin`. Buyers sign in at checkout (phone + password).

- Login at `/admin/login` posts to `/api/auth/login`.
- JWT in httpOnly cookie `ss_admin_session`.
- `proxy.js` blocks `/admin/*` except login; logged-in users hitting login go to `/admin`.
- API routes also check `getAdminSessionFromRequest`.
- Logout: `/api/auth/logout`.

Buyer auth (checkout):

- Register / login on `/account` (header links) and on `/checkout` before placing an order.
- JWT in httpOnly cookie `ss_customer_session`.
- APIs: `/api/auth/customer/register`, `login`, `logout`, `me`.
- `POST /api/orders` requires a buyer session.

Default seed admin: `admin@agmoo.com` / `Admin@123` (from env).

## Key files

- `lib/auth.js`
- `proxy.js`
- `app/admin/login/page.jsx`
- `app/api/auth/login/route.js`
- `app/api/auth/logout/route.js`
- `app/api/auth/me/route.js`
- `app/api/auth/customer/*`
- `app/checkout/page.jsx`
- `prisma` `Customer` model

## Rules to keep

- Protect every admin page and mutating admin API.
- Orders require buyer sign-in; admin cookie stays `ss_admin_session`, buyer cookie `ss_customer_session`.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [x] we need login for buyer, when he just aboutt to checkouttt he shold ask for login , withtoutt login no one can place order, while createt accountt required field, name, shop,name, address phone, confirm phone , passowrd , confirm passowrd, no need o add phone verificaion , so while login he will required phone and password. 

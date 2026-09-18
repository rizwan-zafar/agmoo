# Agmoo module docs

These files describe what each part of the site does.

**How to request a change**

1. Open the module file that matches the work (see the list below).
2. Add a new item under **Requested changes** at the top of that list.
3. Write what you want in plain language. Newest first.
4. Tell the agent to implement from that file.

The agent should read the matching module doc before editing that area, follow **Rules to keep**, then implement **Requested changes** and tick them off when done.

| Module | File | Covers |
| --- | --- | --- |
| Home | [home.md](./home.md) | Homepage 3D studio, hero, showroom, standard, field notes, COD |
| Products / shop | [products.md](./products.md) | Shop listing, product cards, product detail, flying accessories |
| Categories | [categories.md](./categories.md) | Category index and category product pages |
| Cart | [cart.md](./cart.md) | Guest cart in localStorage |
| Checkout | [checkout.md](./checkout.md) | COD checkout and success |
| Guides | [blogs.md](./blogs.md) | Storefront blog / field notes |
| Content pages | [content-pages.md](./content-pages.md) | About and contact |
| Admin | [admin.md](./admin.md) | Admin shell, dashboard, catalog, orders, messages |
| Auth | [auth.md](./auth.md) | Admin login, JWT cookie, `/admin` proxy |
| API | [api.md](./api.md) | Next.js route handlers |
| Catalog & database | [catalog-db.md](./catalog-db.md) | Prisma, MySQL `agmoo`, seed catalog |
| Email | [mail.md](./mail.md) | Order emails and receipts |
| Shared UI | [common-ui.md](./common-ui.md) | Buttons, forms, table, toasts |
| Layout & chrome | [layout-chrome.md](./layout-chrome.md) | Root layout, navbar, footer |

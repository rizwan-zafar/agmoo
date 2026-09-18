# Module: Catalog & database

## What it does

MySQL database named `agmoo`. Prisma is the ORM.

Models: Admin, Category, Product, ProductVariant, Order, OrderItem, Blog, ContactMessage.

Seed catalog lives in `prisma/catalog.js` (14 products, 5 categories, JPG paths). `prisma/seed.js` recreates categories/products/blogs and creates the admin if missing. Seed **deletes** products, categories, and blogs then inserts again. It does not wipe orders.

Images live in `public/images/products`, `public/images/categories`, `public/images/blog`.

## Key files

- `prisma/schema.prisma`
- `prisma/catalog.js`
- `prisma/seed.js`
- `lib/db.js`
- `.env` `DATABASE_URL` (use `127.0.0.1`, not `localhost` socket, on this machine)

## Rules to keep

- DB name stays `agmoo`.
- Product images are real photos (`.jpg`), not SVG placeholders.
- Changing catalog.js requires `npm run db:seed` to update MySQL (this wipes catalog rows).
- Order numbers use prefix `PL-`.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

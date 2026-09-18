# Module: Categories

## What it does

Groups products into five shop boards: Charging Cables, Chargers & Adapters, Earbuds, Handsfree, Power Banks.

- `/categories` — grid of category cards with photos.
- `/categories/[slug]` — products in that category.
- Homepage Showroom uses the same category records and images.

## Key files

- `app/categories/page.jsx`
- `app/categories/[slug]/page.jsx`
- `components/categories/CategoryCard.jsx`
- `components/home/HomeCategoryWall.jsx`
- Category images under `public/images/categories/`
- Prisma `Category` model and `prisma/catalog.js`

## Rules to keep

- Category photos are real JPGs, not SVG placeholders.
- Showroom bento stays structurally as a featured first board + smaller tiles.
- Admin can add/edit/deactivate categories; storefront lists `ACTIVE` only.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

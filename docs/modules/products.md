# Module: Products / shop

## What it does

Lets customers browse and open accessory products.

- `/products` — shop listing with search, category filter, and sort (newest, price, name).
- `/products/[slug]` — product detail, variant picker, add to cart, related products.
- Product cards show the first catalog photo, sale / low-stock / out-of-stock badges, and a one-click add using the cheapest in-stock variant.
- Shop page has one flying 3D accessory at a time (earbuds → cable → wall adapter → power bank). It roams the viewport, does not sit in a corner, and does not block clicks.

## Key files

- `app/products/page.jsx`
- `app/products/[slug]/page.jsx`
- `components/products/ProductGrid.jsx`
- `components/products/ProductCard.jsx`
- `components/products/ProductFilters.jsx`
- `components/products/FilterSelect.jsx`
- `components/products/ProductDetailActions.jsx`
- `components/products/PriceDisplay.jsx`
- `components/products/QuantitySelector.jsx`
- `components/products/ProductImageCarousel.jsx`
- `components/admin/ProductImagesUploader.jsx`
- `components/products/ShopVoltMark.jsx`
- `lib/product.js`
- Shop filter / fly CSS in `app/globals.css` (`.shop-*`)

## Rules to keep

- Prices are PKR via `formatCurrency` (`Rs.`).
- Variants drive price and stock. Product `price` / `stock` are summaries.
- Custom Category and Sort dropdowns (not native `<select>`).
- Flying accessory: one item at a time, pointer-events none.
- Product image uploads: admin hint **1600×1600** square, JPEG/WebP, max 5 MB (`ProductImagesUploader`).

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [x] Up to 5 product images in admin (`ProductImagesUploader`); detail page carousel (`ProductImageCarousel`).

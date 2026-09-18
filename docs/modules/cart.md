# Module: Cart

## What it does

Guest cart. No login. Stored in `localStorage` under `agmoo_cart_v1`.

Customers add products (with a variant) from cards or the product page, change quantity on `/cart`, and go to checkout.

## Key files

- `components/cart/CartContext.jsx`
- `components/cart/CartItemRow.jsx`
- `app/cart/page.jsx`
- Navbar cart count

## Rules to keep

- Stay guest-only. Do not add accounts unless requested.
- Cart items must keep `variantId` so checkout decrements the right stock.
- Storage key is `agmoo_cart_v1`.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

# Module: Layout & chrome

## What it does

Root App Router layout, fonts, global CSS, and storefront chrome.

- `app/layout.jsx` — Outfit + Inter, CartProvider, ToastProvider, SiteChrome.
- `SiteChrome` hides navbar/footer on `/admin`.
- Navbar: Home, Shop, Categories, Guides, About, Contact, cart.
- Footer: same links, Agmoo copy.
- `app/globals.css` — Tailwind v4, brand tokens, homepage 3D, shop fly, admin layout.

## Key files

- `app/layout.jsx`
- `app/globals.css`
- `components/common/SiteChrome.jsx`
- `components/common/Navbar.jsx`
- `components/common/Footer.jsx`

## Rules to keep

- Admin routes must not get the public header/footer.
- `body:has(.home-studio)` keeps homepage dark including footer spacing.
- `body:has(.admin-studio)` sets the admin background.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

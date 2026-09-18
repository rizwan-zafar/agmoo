# Module: Home

## What it does

The storefront homepage is a dark 3D studio. It sells Agmoo mobile accessories (cables, chargers, earbuds, handsfree, power banks) with guest Cash on Delivery.

Sections in order:

1. **Hero** — mouse-tracked CSS 3D studio (phone, buds, GaN cube, power bank, cable). No Three.js.
2. **The Agmoo standard** — process rail Charge → Last → Fit → Arrive. A 3D cube auto-travels the rail. Steps stay still. Must not look like Showroom.
3. **Showroom** — bento category boards with real product photos.
4. **Cash on Delivery** — COD copy plus a small 3D COD scene.
5. **Featured accessories** — product cards on a 3D shelf.
6. **Field notes** — three guide plates on a 3D desk (not a messy card fan).
7. **Last 1% CTA** — link to all products.

## Key files

- `app/page.jsx`
- `components/home/HeroScene.jsx`
- `components/home/HomeStandard.jsx`
- `components/home/HomeCategoryWall.jsx`
- `components/home/HomeCodScene.jsx`
- `components/home/HomeFieldNotes.jsx`
- `components/home/TiltCard.jsx`
- `components/home/SectionTilt.jsx`
- Home-related CSS in `app/globals.css` (`.home-studio`, `.hero-3d-*`, `.std-*`, `.kit-*`, `.notes-*`, `.product-stage`, `.cod-*`)

## Rules to keep

- 3D is CSS + `requestAnimationFrame` only. Do not add Three.js unless the requested change says so.
- Keep Showroom and Standard visually different.
- Respect `prefers-reduced-motion`.
- Homepage uses the dark studio wrapper. Do not lighten the whole home to match inner shop pages.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

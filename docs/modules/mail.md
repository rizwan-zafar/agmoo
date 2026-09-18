# Module: Email

## What it does

Nodemailer sends HTML order mail when SMTP env vars are set.

- Customer confirmation after checkout.
- Admin notify to `ADMIN_NOTIFY_EMAIL`.
- Receipt HTML reused for `/api/orders/[id]/receipt`.

If SMTP is empty, checkout still works; send is skipped.

## Key files

- `lib/mail.js`
- `.env.example` SMTP keys

## Rules to keep

- Escape customer-provided HTML.
- Brand copy is Agmoo, not spices.
- Never fail the order just because email failed.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

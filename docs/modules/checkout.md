# Module: Checkout

## What it does

Cash on Delivery only. No online payment.

`/checkout` collects name, phone, address (email optional). Submit creates an order (`PL-` prefix), decrements variant stock in a transaction, emails customer + admin when SMTP is set, then `/checkout/success`.

Cancelling an order in admin restores stock.

## Key files

- `app/checkout/page.jsx`
- `app/checkout/success/page.jsx`
- `app/api/orders/route.js`
- `lib/mail.js`

## Rules to keep

- Payment method stays COD.
- Guest checkout, no account.
- Stock changes must stay transactional.
- If SMTP is missing, checkout still succeeds; emails are skipped.

## Requested changes

Write new work here. Newest first. Tick the box when it is done.

- [ ] _(none)_

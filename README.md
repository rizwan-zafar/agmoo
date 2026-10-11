# Agmoo — Mobile Accessories Store

A full-stack e-commerce website for **mobile accessories** (charging cables,
adapters, earbuds, handsfree, power banks). Built with **Next.js (App Router)**,
**plain JavaScript**, and **MySQL** (via **Prisma**). Storefront, API, and admin
live in one Next.js project.

## Tech Stack

- **Next.js 16** (App Router, Route Handlers, Proxy)
- **React 19** — plain JavaScript, no TypeScript
- **Prisma ORM** + **MySQL**
- **Tailwind CSS v4**
- **bcryptjs** + **jsonwebtoken** for admin sessions

## Getting Started

### 1. Prerequisites

- Node.js 20+
- A running MySQL server with a database named `agmoo`

### 2. Configure environment

Copy `.env.example` to `.env` (or use the local `.env` already in the project):

```
DATABASE_URL="mysql://root:@127.0.0.1:3306/agmoo"
JWT_SECRET="change-this-in-production"
AUTH_SECRET="change-this-in-production"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_SEED_EMAIL="admin@agmoo.com"
ADMIN_SEED_PASSWORD="Admin@123"
ADMIN_NOTIFY_EMAIL="admin@agmoo.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Agmoo <noreply@agmoo.com>"
```

Fill in `SMTP_USER` and `SMTP_PASS` to send order emails. If SMTP is empty, orders still work — emails are skipped.

### 3. Install, migrate, seed

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and
[http://localhost:3000/admin/login](http://localhost:3000/admin/login).

**Default admin login:** `admin@agmoo.com` / `Admin@123`

## Flow

Customer → Products → Cart (localStorage) → Checkout (COD) → stock decremented
in a transaction → emails → admin dashboard.

Guest checkout only. Cancelling an order restores stock.

## cPanel deploy (same pattern as Plugo)

Keep **two folders**. Do not put the Next app in `public_html`.

| Role | Path |
| --- | --- |
| Application root (Node / GitHub upload) | `/home/YOURUSER/agmoo` |
| Domain document root (leave this) | `/home/YOURUSER/public_html` |
| Application URL | your domain (`/`) |

**Setup Node.js App:** Node 20, Production, application root `/home/YOURUSER/agmoo`, Application URL = your domain, startup file = **`server.js`**. CloudLinux writes Passenger into `public_html/.htaccess` and sets `PORT`.

GitHub **Deploy to cPanel** (`push` to `main` or `backup`): `npm ci` → `prisma generate` → `next build` → upload to `CPANEL_APP_PATH` → write `.env` → restart. No `npm ci` on the server. No table create on deploy — import dumps yourself.

Secrets: `CPANEL_HOST`, `CPANEL_USERNAME`, `CPANEL_PORT` (`22`), `CPANEL_SSH_KEY`, `CPANEL_SSH_PASSPHRASE` if needed, `CPANEL_APP_PATH` = `/home/YOURUSER/agmoo`, `CPANEL_NODEVENV`, `ENV_DATABASE_URL`, `ENV_AUTH_SECRET`, `ENV_NEXT_PUBLIC_SITE_URL`. Optional SMTP secrets. No `CPANEL_PASSWORD`.

`ENV_AUTH_SECRET` is written as `JWT_SECRET`. If Save/Restart says lock, wait. WordPress in `public_html` will break `/_next/` assets.

Manual pack (optional): `./scripts/cpanel-pack.sh` → upload `agmoo-cpanel.tar.gz`.

## Module docs

What each part of the site does lives in [`docs/modules/`](docs/modules/). To request a change, open the matching file and write under **Requested changes**. The agent reads that file and implements from it.

# Addis Eats — Week 9 Integration

An authenticated, optimised, indexable Next.js App Router application.

## Day-by-day

| Day | Area                           | Key files                                                                     |
| --- | ------------------------------ | ----------------------------------------------------------------------------- |
| 41  | Data fetching (SWR + TanStack) | `app/menu/SearchBox.js`, `PaginatedMenu.js`, `app/orders/[id]/OrderStatus.js` |
| 42  | Auth & authorization           | `proxy.js`, `lib/session.js`, `app/orders/actions.js`, `app/kitchen/page.js`  |
| 43  | Optimisation                   | `next/image`, `next/font`, `.env.local`                                       |
| 44  | SEO                            | `app/sitemap.js`, `app/robots.js`, `generateMetadata` on dish pages           |

## Run

\```bash
npm install
npm run dev
npm run build && npm run start
\```

Demo credentials:

- Customer: `user@example.com / password123`
- Staff: `staff@example.com / password123`

## Architecture

- **Static public pages, dynamic private pages.** Auth state lives in a
  client `<AuthNav />` island, not in the layout, so `/menu/[id]` still
  prerenders via `generateStaticParams`.
- **Three layers of protection.** `proxy.js` redirects early. Pages call
  `getSession()` to render correctly. Server Actions re-check ownership
  before mutating — the real authorization boundary.
- **One cart, one orders array.** No duplicate data modules.

## Protected routes

| Route       | Protection                                           |
| ----------- | ---------------------------------------------------- |
| `/checkout` | proxy + page + `noindex`                             |
| `/orders`   | proxy + page + ownership check in action + `noindex` |
| `/kitchen`  | proxy + page role check + `noindex`                  |
| `/signin`   | public + `noindex`                                   |

See `AUTH.md` and `SEO.md` for full rationale.

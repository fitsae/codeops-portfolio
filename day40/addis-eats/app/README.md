# Addis Eats

Day 40 mini-project. A food-ordering app built with Next.js App
Router, JavaScript, and React Server Components.

## Routes

| URL           | File                      | Rendering                              |
| ------------- | ------------------------- | -------------------------------------- |
| `/`           | `app/page.js`             | Static                                 |
| `/menu`       | `app/menu/page.js`        | Server-rendered, direct data access    |
| `/menu/[id]`  | `app/menu/[id]/page.js`   | Prerendered via `generateStaticParams` |
| `/cart`       | `app/cart/page.js`        | Server shell + client island           |
| `/checkout`   | `app/checkout/page.js`    | Server shell + Server Action           |
| `/api/orders` | `app/api/orders/route.js` | Route Handler (POST)                   |
| unknown URLs  | `app/not-found.js`        | 404                                    |

## Architectural documents

- [`STRATEGY.md`](./STRATEGY.md) — rendering decisions per route
- [`BOUNDARY.md`](./BOUNDARY.md) — Server / Client component split

## Commands

```bash
npm run dev      # development
npm run build    # production build
npm run start    # production server
```

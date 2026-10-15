# Addis Eats

A food-delivery application for Addis Ababa. Built with Next.js 16 App Router,
demonstrating file-based routing, server/client components, layouts, rendering
strategies, authentication, live data, maps, and data presentation.

## What it does

- Browse a menu and view dish details
- Add dishes to a cart and place an order
- Sign in and view your own order history
- Track a delivery on a live map with SSE status updates
- View a dashboard with revenue charts
- Export orders and order history as CSV

## Routes

| Route          | Purpose                 | Strategy                          |
| -------------- | ----------------------- | --------------------------------- |
| `/`            | Landing page            | Static                            |
| `/menu`        | Dish list with search   | ISR                               |
| `/menu/[id]`   | Dish detail             | Static via `generateStaticParams` |
| `/cart`        | Cart                    | Client                            |
| `/checkout`    | Order form              | Dynamic                           |
| `/signin`      | Sign in                 | Static                            |
| `/orders`      | Your orders (paginated) | Dynamic                           |
| `/orders/[id]` | Order detail            | Dynamic                           |
| `/track/[id]`  | Live tracking map + SSE | Dynamic seed + Client stream      |
| `/dashboard`   | Revenue chart + export  | Dynamic                           |
| `/kitchen`     | Staff-only              | Dynamic, role check               |

## API

| Endpoint                      | Purpose                                         |
| ----------------------------- | ----------------------------------------------- |
| `GET /api/dishes`             | List dishes (supports `?q=` search)             |
| `GET /api/dishes/[id]`        | One dish, 404 if missing                        |
| `POST /api/orders`            | Create order with Zod validation, 422 on errors |
| `POST /api/signin`            | Set session cookie                              |
| `GET /api/orders/[id]/stream` | SSE stream for live status                      |

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- SWR (client fetching)
- Recharts (charts)
- Leaflet + React-Leaflet (maps)
- Zod (validation)

## Getting started

```bash
git clone <repo-url>
cd addis-eats-track
npm install
cp .env.example .env.local     # fill in real values
npm run dev                    # http://localhost:3000
```

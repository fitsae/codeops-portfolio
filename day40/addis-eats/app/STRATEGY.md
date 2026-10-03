# Rendering Strategy — Addis Eats

Each route was chosen deliberately. This document explains why.

## `/` — Static

The home page contains fixed content — no data, no user state.
Next prerenders it once at build time. Nothing to cache, nothing to invalidate.

## `/menu` — Server-rendered, data fetched on the server

`app/menu/page.js` is an async Server Component. It reads
`searchParams`, filters dishes, and renders HTML on the server.
No API layer exists between the page and the data — `getDishes()`
is imported and called directly.

Rationale: the menu has no caller other than this page. An HTTP
endpoint would add serialization and latency without any benefit.

## `/menu/[id]` — Prerendered dynamic route

`generateStaticParams()` returns every known dish ID, so Next
generates one HTML file per dish at build time. Direct visits are
instant. Unknown IDs fall through to `notFound()`, which renders
`app/not-found.js`.

Rationale: the dish set is finite and known. Prerendering is
strictly faster than rendering on demand.

## `/cart` — Server shell, client island

`app/cart/page.js` is a Server Component. Only the interactive
list — `<CartClient />` — carries `"use client"`.

Rationale: keep the client bundle as small as possible. The
heading and layout stream from the server; only the stateful
list is hydrated.

## `/checkout` — Server Action mutation

The page is a Server Component. The form is a small client
component (`CheckoutForm`) that uses `useActionState` to call
`placeOrder`, a Server Action.

Rationale: Server Actions are the right tool when a Next.js UI
is the only caller. The action runs on the server — its code
never ships to the browser — and can validate before mutating.

## `/api/orders` — Route Handler

A real HTTP endpoint exists because external callers may POST
orders (mobile client, webhook). Anything reachable from outside
the Next.js app needs a Route Handler, not a Server Action.

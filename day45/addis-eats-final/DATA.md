# Addis Eats — Data Strategy

Every piece of data has an owner. This document records why.

## Home page featured dishes

- **Source:** imported directly from `lib/dishes.js`
- **Strategy:** Server Component
- **Reason:** static content, no interaction, no polling. Rendering on
  the server ships HTML that's ready to paint.

## Menu — full list

- **Endpoint:** `GET /api/dishes?page=1`
- **SWR key:** `/api/dishes?page=${page}`
- **Strategy:** SWR + `keepPreviousData: true`
- **Reason:** page state lives in the browser. Clicking Next changes
  the key; SWR caches each page separately so Back is instant.

## Menu — search

- **Endpoint:** `GET /api/dishes?q=<term>`
- **SWR key:** `debounced ? "/api/dishes?q=" + debounced : null`
- **Strategy:** SWR + `useDebounce(300ms)` + `keepPreviousData`
- **Reason:** the request depends on user typing. Debouncing means one
  request per pause, not one per keystroke. A `null` key suppresses the
  request when the input is empty.
- **Race conditions:** SWR discards stale responses — a slow reply to
  `q=tib` cannot overwrite a newer reply to `q=tibs`.

## Order status

- **Endpoint:** `GET /api/orders/[id]`
- **SWR key:** `/api/orders/${id}`
- **Strategy:** SWR + `fallbackData` + `refreshInterval: 5000`
- **Reason:** order status changes while the page is open. Server fetch
  provides the first paint with no loading flash; `fallbackData` seeds
  the client cache; polling keeps the display current.
- **Server seed:** `lib/orders-api.js → getOrder(id)` runs inside
  `app/orders/[id]/page.js` (a Server Component) and its result is
  passed as `initialOrder`.

## Cart

- **Endpoint:** `GET /api/cart`, `POST /api/cart`
- **SWR key:** `/api/cart`
- **Strategy:** SWR + `mutate()` after each write
- **Reason:** the write mutates server state; the cached read must
  reflect it. `mutate()` refetches only `/api/cart`, nothing else.

## TanStack Query parity (alternative implementation)

- **Query keys:** `["dishes"]`, `["orders", id]`, `["cart"]`
- **staleTime:** 30 s for menu data; 0 s for order status
- **gcTime (default):** 5 minutes
- **Mutations:** `useMutation` with `onSuccess → invalidateQueries`
- **Why the array key shape:** `invalidateQueries({ queryKey: ["cart"] })`
  targets every cart-scoped query by prefix. This is the feature that
  makes TanStack worth choosing when an app has many interrelated
  queries.

## What stays on the server

- The home page dish list
- The initial fetch for every route's Server Component
- The Route Handlers themselves (`/api/dishes`, `/api/orders/[id]`,
  `/api/cart`) — they run on the Node server, not in the browser

## What moves to the browser

| Requirement        | Owner                                   |
| ------------------ | --------------------------------------- |
| Polling            | SWR `refreshInterval`                   |
| Search-as-you-type | SWR + debounce                          |
| Pagination clicks  | SWR keyed by page                       |
| Mutations          | `mutate()` / `invalidateQueries()`      |
| Conditional fetch  | `null` key (SWR) / `enabled` (TanStack) |

## Order status (TanStack Query variant)

- **Query key:** `["orders", id]`
- **Strategy:** Server prefetch → dehydrate → HydrationBoundary → useQuery
- **Server prefetch:** `prefetchQuery` in the Server Component
- **Client:** `useQuery` reads the hydrated cache. `refetchInterval: 5000`
  drives polling.
- **staleTime:** 0 — order status can change at any moment.
- **Difference from SWR `fallbackData`:** `fallbackData` is a value we
  pass in; `HydrationBoundary` restores the entire query cache,
  including `dataUpdatedAt`, so TanStack knows whether the data is
  already stale. That distinction is why `initialDataUpdatedAt` exists
  for `initialData`.

## Server Action vs Route Handler vs Client Query

Three ways to write data, three reasons to pick each:

| Concern                 | Server Action                      | Route Handler             | Client library (SWR / TQ)      |
| ----------------------- | ---------------------------------- | ------------------------- | ------------------------------ |
| Triggered by            | A form in our own UI               | Any HTTP client           | Any client component           |
| Runs                    | Server                             | Server                    | Client (calls an endpoint)     |
| Progressive enhancement | Yes (form works without JS)        | No                        | No                             |
| Caching                 | `revalidatePath` / `revalidateTag` | Manual                    | `mutate` / `invalidateQueries` |
| Use for                 | Own-UI form submissions            | Mobile / external callers | Polling, search, paging        |

We chose Server Action for `addToCartAction` because the only caller
is our own form. The same write via `POST /api/cart` was chosen for
the SWR cart because we wanted the client cache to control
revalidation with `mutate()`.

## Take-Home Feature: Live Order Tracking

1. **What data is fetched?**
   The order's status timeline (array of `{ ts, status }` entries)
   from `GET /api/orders/[id]/history`.

2. **Why client-side?**
   The list grows as the order progresses. A server render at page
   load would show a snapshot; the user needs ongoing updates.

3. **Query key?**
   `/api/orders/${id}/history` (SWR). If ported to TanStack:
   `["orders", id, "history"]`.

4. **staleTime?**
   TanStack: 0 s — history entries arrive as the order advances.
   SWR has no direct equivalent; the poll interval does the job.

5. **What triggers revalidation?**
   `refreshInterval: 10000` — a 10 s poll, deliberately offset from
   the 5 s status poll so the two requests don't fire simultaneously.

6. **What happens after a mutation?**
   No mutation endpoint yet. In production, a status change POST
   would call `mutate("/api/orders/${id}/history")` on the client
   (or `revalidatePath` server-side via a Server Action).

7. **Is server initial data available?**
   Yes — `getOrder(id)` and a future `getOrderHistory(id)` could
   both be prefetched, then hydrated into SWR via `fallbackData`
   or into TanStack via `HydrationBoundary`. We skipped it here to
   keep the exercise focused on polling, but the pattern is the same
   as the status card.

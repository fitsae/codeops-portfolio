# Server / Client Boundary — Addis Eats

For each component: is it a Server Component or a Client Component,
and why?

## RootLayout (`app/layout.js`) — Server

Reads no state, subscribes to no events, uses no browser APIs.
Its only job is to provide shared HTML structure and metadata.

## HomePage (`app/page.js`) — Server

Static content plus a `<Link>`. `<Link>` is not a browser API —
it renders an anchor on the server and Next enhances it on the
client. No `"use client"` needed.

## MenuLayout (`app/menu/layout.js`) — Server

Renders a sidebar of `<Link>`s. No interactivity.

## MenuPage (`app/menu/page.js`) — Server

An async function. Reads `searchParams`, awaits `getDishes()`,
renders HTML. Async Server Components are the entire reason
Server Components exist.

## DishPage (`app/menu/[id]/page.js`) — Server

Awaits `params`, awaits `getDishById()`, calls `notFound()` when
missing. `notFound()` is a server-side redirect, not a browser API.

## Loading (`app/menu/loading.js`) — Server

A pure markup fallback. No state, no effects.

## Error (`app/menu/error.js`) — Client

Uses `onClick` and the `reset()` prop — both browser-only.
Must be a Client Component by Next's rules.

## CartPage (`app/cart/page.js`) — Server

Just wraps `<CartClient />` in a heading. Keeps the client
boundary at the leaf.

## CartClient (`components/CartClient.jsx`) — Client

Uses `useState` for cart items. The cart is browser state.
There is no server-side "cart" in this app.

## CheckoutPage (`app/checkout/page.js`) — Server

Renders the heading and `<CheckoutForm />`. Same pattern as cart:
server shell, client island.

## CheckoutForm (`components/CheckoutForm.jsx`) — Client

Uses `useActionState` to call the `placeOrder` Server Action and
read its return value. Stateful and interactive.

## placeOrder (`app/actions.js`) — Server Action

Marked `"use server"`. Runs entirely on the server. The client
bundle receives only a reference.

## POST handler (`app/api/orders/route.js`) — Server

Route Handlers always run on the server. No React involved.

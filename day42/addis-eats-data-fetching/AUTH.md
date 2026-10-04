# Addis Eats — Authentication & Authorization

## Route protection map

| Route / Action      | Public | Session | Role | Ownership | File                      |
| ------------------- | :----: | :-----: | :--: | :-------: | ------------------------- |
| `/`                 |   ✅   |         |      |           | `app/page.js`             |
| `/menu`             |   ✅   |         |      |           | `app/menu/page.js`        |
| `/menu/[id]`        |   ✅   |         |      |           | `app/menu/[id]/page.js`   |
| `/signin`           |   ✅   |         |      |           | `app/signin/page.js`      |
| `/checkout`         |        |   ✅    |      |           | `proxy.js` + page         |
| `/orders`           |        |   ✅    |      |    ✅     | `app/orders/page.js`      |
| `/kitchen`          |        |   ✅    |  ✅  |           | `app/kitchen/page.js`     |
| `cancelOrder()`     |        |   ✅    |      |    ✅     | `app/orders/actions.js`   |
| `POST /api/signin`  |   ✅   |         |      |           | sets session cookie       |
| `POST /api/signout` |        |   ✅    |      |           | clears session cookie     |
| `placeOrder()`      |        |   ✅    |      |           | `app/checkout/actions.js` |

## Three-layer protection

1. **`proxy.js`** — early redirect. Proves only that a session cookie exists.
   Matcher: `/checkout/:path*`, `/orders/:path*`.
2. **Page (Server Component)** — calls `getSession()` and decides what to render.
   Cannot be trusted as the final auth check.
3. **Server Action / Route Handler** — the real security boundary. Re-establishes
   identity via `getSession()` and checks ownership before any mutation.

## Session model

- Cookie name: `session`
- Value: a user ID (`demo-user-1` or `demo-staff-1`) — **learning only**.
  A real app would store an opaque session token or a signed JWT.
- Flags: `httpOnly: true`, `secure` in production, `sameSite: "lax"`, `maxAge: 7 days`, `path: "/"`.

## Security tests

| Test                                | Expected                                             |
| ----------------------------------- | ---------------------------------------------------- |
| `GET /orders` signed out            | Redirect to `/signin?next=/orders`                   |
| `cancelOrder("ord-1")` signed out   | Error: "Not signed in"                               |
| `cancelOrder("ord-2")` as user 1    | Error: "You are not allowed to cancel this order"    |
| `/kitchen` as customer              | "Forbidden"                                          |
| `/kitchen` as staff                 | Kitchen page renders                                 |
| `/signin?next=https://evil.example` | After sign-in, falls back to `/` (rejected external) |

## What was deliberately NOT built here

Hand-rolled authentication is a teaching device, not a production pattern. A
real application uses Auth.js, Clerk, or similar. Those tools handle:

- password hashing (bcrypt / argon2)
- session invalidation on logout across devices
- password reset
- OAuth
- CSRF protection
- rate limiting
- account recovery

## Rules to remember

1. **The browser controls the interface; the server controls authorization.**
2. **Never trust client-supplied IDs.** Always scope queries with `session.userId`.
3. **Hiding a button is not authorization.** Check ownership inside the action.
4. **Never store session tokens in `localStorage`.** Use `httpOnly` cookies.
5. **Validate `next` on login.** Reject anything that doesn't start with a single `/`.

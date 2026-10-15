---

````markdown
# AUTH

Three layers of protection, and only one of them is security.

## The three layers

| Layer            | Where                   | What it proves                       | Is it security? |
| ---------------- | ----------------------- | ------------------------------------ | --------------- |
| Middleware       | Root `middleware.js`    | A session cookie exists              | No              |
| Page / layout    | Server component        | The session is real                  | Partly          |
| Action / handler | `"use server"` or route | The caller may touch **this record** | **Yes**         |

Middleware redirects before any rendering happens, so it saves work.
The page check makes sure the screen matches the person. The action
check is the one that cannot be bypassed.

## Route protection map

| Route                 | Middleware | Page check                              | Action / handler               |
| --------------------- | ---------- | --------------------------------------- | ------------------------------ |
| `/menu`, `/menu/[id]` | —          | —                                       | — (public, indexable)          |
| `/cart`               | —          | —                                       | — (client store)               |
| `/checkout`           | ✅ cookie  | ✅ session                              | ✅ inside `placeOrder`         |
| `/orders`             | ✅ cookie  | ✅ session + scoped query               | —                              |
| `/orders/[id]`        | ✅ cookie  | ✅ session + `getOrderFor(id, user.id)` | ✅ in `cancelOrder`            |
| `/track/[id]`         | ✅ cookie  | ✅ session + scoped query               | ✅ 401 / 404 in stream handler |
| `/kitchen`            | ✅ cookie  | ✅ role check (`staff`)                 | — (read-only for now)          |

## Session cookie

```js
cookies().set("session", token, {
  httpOnly: true, // JavaScript cannot read it
  secure: true, // HTTPS only (auto in production)
  sameSite: "lax", // not sent from other sites
  maxAge: 60 * 60 * 24 * 7,
});
```
````

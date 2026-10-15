---

````markdown
# DATA

Every query in the application: where it runs, its key, its refresh
rule, and the reasoning.

## Table

| Data                | Where                          | Key / input               | Refresh          | Why                                     |
| ------------------- | ------------------------------ | ------------------------- | ---------------- | --------------------------------------- |
| Dishes list         | Server component               | —                         | On request       | Public, cacheable, indexable            |
| Dish detail         | Server, `generateStaticParams` | `id`                      | Prebuilt         | One page per dish, no runtime cost      |
| Menu search         | Client (SWR)                   | `/api/dishes?q=<term>`    | Debounced 300 ms | Typed by the person; needs race safety  |
| Cart contents       | Client (Context)               | —                         | Local only       | Never leaves the browser until checkout |
| Checkout POST       | Client → route handler         | `POST /api/orders`        | On submit        | Form-driven write                       |
| Sign-in POST        | Client → route handler         | `POST /api/signin`        | On submit        | Sets cookie                             |
| Orders list         | Server component               | `session.id`, `page`      | On request       | Private; scoped; paginated              |
| Order detail        | Server component               | `session.id`, `id`        | On request       | Private; ownership enforced             |
| Order status (seed) | Server component               | `id`, `session.id`        | On request       | Render the first view without a spinner |
| Order status (live) | Client (SSE)                   | `/api/orders/[id]/stream` | Live stream      | One-way feed; updates every 5s          |
| Dashboard revenue   | Server component               | —                         | On request       | Aggregate before crossing the boundary  |
| Dashboard CSV       | Client                         | In-memory                 | On click         | No server round-trip needed             |
| Order history CSV   | Client                         | In-memory                 | On click         | Already in the browser                  |

## The rules

### Server first

If a Server Component can fetch the data, it does. A client fetch is
a fallback for the cases the server genuinely cannot cover.

### What stays client-only

- Data triggered by typing (`SearchBox`)
- Data triggered by a click (`ExportOrdersButton`)
- Data that must keep updating on its own (`TrackingClient` SSE)
- Data private to one tab (`Cart`)

### Seed the client

```jsx
// Server
const order = await getOrderFor(id, user.id);
return <TrackingClient order={order} />;

// Client — first render already has the data
const [status, setStatus] = useState(order.status);
```
````

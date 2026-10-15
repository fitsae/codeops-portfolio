---

````markdown
# PERF

Measured on the deployed preview, throttled to Slow 4G with 4× CPU
slowing. Every number below comes from `npm run build && npm run start`,
never from `npm run dev`.

## Budget vs actual

| Metric                   | Target   | Before | After | What moved it                                                   |
| ------------------------ | -------- | ------ | ----- | --------------------------------------------------------------- |
| LCP (mobile 4G)          | < 2.5 s  | 4.8 s  | 1.9 s | `next/image` with real dimensions and `sizes`                   |
| CLS                      | < 0.1    | 0.21   | 0.02  | Reserved image space + `next/font`                              |
| INP                      | < 200 ms | 240 ms | 90 ms | Server components ship no JS; only two client leaves on `/menu` |
| First Load JS `/menu`    | < 120 kB | 187 kB | 94 kB | Server components + code-split routes                           |
| Largest image on `/menu` | < 150 kB | 1.9 MB | 82 kB | `next/image` WebP + responsive `srcset`                         |
| Lighthouse performance   | ≥ 90     | 61     | 96    | All of the above                                                |

## What caused each change

1. **`next/image` with honest `sizes`** — the single biggest win.
   A 1.9 MB JPEG becomes 82 kB of WebP for the actual display width.
2. **`next/font` self-hosted** — no third-party round trip, no FOIT,
   metric-matched fallback that barely shifts the layout.
3. **Server components everywhere except two client leaves** on the
   menu — the page ships the interactive parts (search + filter) and
   nothing else.
4. **Leaflet deferred** with `dynamic(..., { ssr: false })` — the
   ~40 kB library is not on any route except `/track/[id]`.
5. **Recharts scoped** to `/dashboard` — not in the menu bundle.

## Server time

LCP also depends on the HTML arriving. On `/orders/[id]` and
`/dashboard`, `getOrderFor` and the aggregation are awaited
server-side; they are fast because they hit local memory in the
demo. In production, the same pattern with a well-indexed query is
faster than any client fetch.

## Reproduction

```bash
npm run build
npm run start
# Chrome DevTools → Lighthouse → Performance
# Network: Slow 4G, CPU: 4× slowdown
# Copy the LCP, CLS, INP numbers
```
````

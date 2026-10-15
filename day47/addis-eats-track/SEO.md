# Addis Eats — SEO Strategy

Where SEO meets authentication. Every choice below is a deliberate split
between public and private routes.

## Public routes (indexed, in sitemap)

| Route        | Metadata                    | Open Graph | JSON-LD          | In sitemap |
| ------------ | --------------------------- | ---------- | ---------------- | :--------: |
| `/`          | static + canonical `/`      | site-wide  | —                |     ✅     |
| `/menu`      | static + canonical `/menu`  | site-wide  | —                |     ✅     |
| `/menu/[id]` | `generateMetadata` per dish | per dish   | MenuItem + Offer |     ✅     |

## Private routes (noindex, NOT in sitemap)

| Route       | Protection (Day 42)            | `robots` metadata   |
| ----------- | ------------------------------ | ------------------- |
| `/checkout` | `proxy.js` + page `getSession` | `noindex, nofollow` |
| `/orders`   | `proxy.js` + page `getSession` | `noindex, nofollow` |
| `/kitchen`  | page role check (`staff`)      | `noindex, nofollow` |
| `/signin`   | public, but no reason to index | `noindex, nofollow` |

## Why both `noindex` AND `robots.txt` disallow

- `robots.txt` stops well-behaved crawlers from **requesting** the URL.
- `noindex` (metadata) stops them from **listing** the URL if they found it
  via a link somewhere else.
- Neither is a security mechanism. `proxy.js` + `getSession()` are.

## The three sources of truth for private routes

1. `proxy.js` matcher → early redirect
2. page-level `getSession()` → render decision
3. `robots.js` + `robots: { index: false }` → SEO hygiene

## Dishes data flow

`lib/dishes.js` → visible page → `generateMetadata` → `sitemap.js`
↘ JSON-LD
↘ `opengraph-image.js`

One array, one slug, four outputs. No drift between page price and
JSON-LD price because both read `dish.price`.

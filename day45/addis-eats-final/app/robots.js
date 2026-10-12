const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://addiseats.et";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/checkout",
          "/orders",
          "/kitchen",
          "/signin",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

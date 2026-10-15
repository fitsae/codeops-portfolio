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
          "/track",
          "/kitchen",
          "/api/",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/sitemap.xml`,
  };
}

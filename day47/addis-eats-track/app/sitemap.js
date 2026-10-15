import { dishes } from "@/lib/dishes";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://addiseats.et";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: `${BASE}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/menu`, priority: 0.9, changeFrequency: "daily" },
  ];

  const dishRoutes = dishes.map((dish) => ({
    url: `${BASE}/menu/${dish.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  // /cart, /checkout, /orders, /kitchen, /signin are deliberately absent.
  return [...staticRoutes, ...dishRoutes];
}

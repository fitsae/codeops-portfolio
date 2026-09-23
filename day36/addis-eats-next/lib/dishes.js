import dishes from "@/data/dishes.json";

// Artificial delay in dev so loading.js is easy to see.
const DELAY = process.env.NODE_ENV === "development" ? 900 : 0;

export async function getDishes() {
  if (DELAY) await new Promise((r) => setTimeout(r, DELAY));
  return dishes;
}

export function getDishById(id) {
  return dishes.find((d) => String(d.id) === String(id)) ?? null;
}

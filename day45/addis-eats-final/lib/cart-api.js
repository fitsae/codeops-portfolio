export async function addToCart(dish) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dish),
  });
  if (!res.ok) throw new Error("Failed to add dish to cart");
  return res.json();
}

import { cart } from "@/lib/cart";

export async function GET() {
  return Response.json(cart);
}

export async function POST(request) {
  const dish = await request.json();
  cart.push(dish);
  return Response.json(
    { message: "Dish added to cart", cart },
    { status: 201 },
  );
}

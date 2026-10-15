import { cart } from "@/lib/cart";

export const metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  const total = cart.reduce((sum, item) => sum + (item.price ?? 0), 0);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-3">
            {cart.map((item, i) => (
              <li key={i} className="rounded-lg border bg-white p-4">
                {item.name} {item.price ? `— ${item.price} ETB` : ""}
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold">Total: {total} ETB</p>
        </>
      )}
    </main>
  );
}

import { cart } from "@/lib/cart";
import { addToCartAction } from "@/actions";

export const metadata = { title: "Cart (Server Action) · Addis Eats" };

export default function CartSAPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Cart via Server Action</h1>

      <p className="mb-6 text-gray-600">Current items: {cart.length}</p>

      <ul className="mb-6 space-y-2">
        {cart.map((item, i) => (
          <li key={i} className="rounded border bg-white p-3">
            {item.name}
          </li>
        ))}
      </ul>

      <form action={addToCartAction}>
        <input type="hidden" name="id" value="99" />
        <input type="hidden" name="name" value="Special Tibs" />
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-4 py-2 text-white"
        >
          Add Special Tibs
        </button>
      </form>
    </main>
  );
}

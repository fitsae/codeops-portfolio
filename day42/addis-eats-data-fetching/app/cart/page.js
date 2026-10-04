import Cart from "./Cart";

export const metadata = { title: "Cart · Addis Eats" };

export default function CartPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Cart</h1>
      <Cart />
    </main>
  );
}

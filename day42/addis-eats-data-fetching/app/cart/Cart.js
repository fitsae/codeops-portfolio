"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Cart() {
  const { data, error, isLoading, mutate } = useSWR("/api/cart", fetcher);

  async function addDish(dish) {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dish),
    });
    mutate(); // ask SWR to refetch /api/cart
  }

  if (isLoading) return <p>Loading cart…</p>;
  if (error) return <p className="text-red-600">Could not load cart.</p>;

  return (
    <div>
      {data.length === 0 ? (
        <p className="mb-6 text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="mb-6 space-y-3">
          {data.map((dish, i) => (
            <li
              key={`${dish.id}-${i}`}
              className="rounded-lg border bg-white p-4"
            >
              {dish.name}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => addDish({ id: 99, name: "Special Tibs" })}
        className="rounded-lg bg-purple-600 px-4 py-2 text-white"
      >
        Add Special Tibs
      </button>
    </div>
  );
}

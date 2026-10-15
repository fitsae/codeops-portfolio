"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

export default function TanStackMenu() {
  const { data, error, isPending } = useQuery({
    queryKey: ["dishes"],
    queryFn: () => fetcher("/api/dishes"),
    staleTime: 30 * 1000,
  });

  if (isPending) return <p>Loading menu…</p>;
  if (error) return <p className="text-red-600">Could not load menu.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.data.map((dish) => (
        <article
          key={dish.id}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-semibold">{dish.name}</h2>
          <p className="mt-2 text-gray-600">{dish.description}</p>
          <p className="mt-4 font-bold">{dish.price} ETB</p>
        </article>
      ))}
    </div>
  );
}

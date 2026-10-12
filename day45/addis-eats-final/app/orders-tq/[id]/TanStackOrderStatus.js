"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchOrder(id) {
  const res = await fetch(`/api/orders/${id}`);
  if (!res.ok) throw new Error("Failed to load order");
  return res.json();
}

export default function TanStackOrderStatus({ id }) {
  const { data, error, isPending } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => fetchOrder(id),
    refetchInterval: 5000, // TanStack's name for SWR's refreshInterval
    staleTime: 0, // order status is always potentially stale
  });

  if (isPending) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Could not load the order.</p>;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">Order #{data.id}</p>
      <h2 className="mt-2 text-2xl font-bold">{data.status}</h2>
      <p className="mt-2">Customer: {data.customer}</p>
      <p className="mt-2">Total: {data.total} ETB</p>
      <p className="mt-4 text-sm text-gray-500">
        Prefetched on the server. Polls every 5 s in the browser.
      </p>
    </div>
  );
}

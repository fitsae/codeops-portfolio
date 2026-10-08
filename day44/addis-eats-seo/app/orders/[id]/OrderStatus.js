"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initialOrder }) {
  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: 5000,
    revalidateOnFocus: true,
  });

  if (error) return <p className="text-red-600">Could not load the order.</p>;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">Order #{data.id}</p>
      <h2 className="mt-2 text-2xl font-bold">{data.status}</h2>
      <p className="mt-2">Customer: {data.customer}</p>
      <p className="mt-2">Total: {data.total} ETB</p>
      <p className="mt-4 text-sm text-gray-500">
        Automatically checking for updates every 5 seconds.
      </p>
    </div>
  );
}

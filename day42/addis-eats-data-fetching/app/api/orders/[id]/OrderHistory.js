"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderHistory({ id }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${id}/history`,
    fetcher,
    { refreshInterval: 10000 }, // 10 s, offset from the status poll
  );

  if (isLoading) return <p className="text-gray-500">Loading history…</p>;
  if (error) return <p className="text-red-600">Could not load history.</p>;
  if (!data?.length) return <p className="text-gray-500">No history yet.</p>;

  return (
    <ol className="mt-6 space-y-3">
      {data.map((entry, i) => (
        <li key={i} className="rounded-lg border bg-white p-3 text-sm">
          <strong>{entry.status}</strong>
          <span className="ml-2 text-gray-500">
            {new Date(entry.ts).toLocaleString()}
          </span>
        </li>
      ))}
    </ol>
  );
}

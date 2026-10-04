"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function PaginatedMenu() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR(
    `/api/dishes?page=${page}`,
    fetcher,
    { keepPreviousData: true },
  );

  if (error) return <p className="text-red-600">Could not load the menu.</p>;
  if (isLoading && !data) return <p>Loading menu…</p>;

  return (
    <div>
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

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          ← Previous
        </button>

        <span className="text-gray-600">
          Page {data.page} of {data.totalPages}
        </span>

        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data.totalPages}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
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
            className="rounded-xl border bg-white p-5 shadow-sm flex flex-col"
          >
            {dish.image && (
              <div className="mb-3 overflow-hidden rounded-lg">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={400}
                  height={250}
                  className="h-40 w-full object-cover"
                />
              </div>
            )}
            <Link
              href={`/menu/${dish.slug ?? dish.id}`}
              className="hover:underline"
            >
              <h2 className="text-xl font-semibold">{dish.name}</h2>
            </Link>
            <p className="mt-2 text-gray-600 flex-1">{dish.description}</p>
            <p className="mt-4 font-bold">{dish.price} ETB</p>

            <div className="mt-4 flex items-center gap-3">
              <AddToCartButton dish={dish} />
              {dish.image && (
                <div className="mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={400}
                    height={250}
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
              <Link
                href={`/menu/${dish.slug ?? dish.id}`}
                className="text-sm text-purple-700 underline"
              >
                View details
              </Link>
            </div>
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

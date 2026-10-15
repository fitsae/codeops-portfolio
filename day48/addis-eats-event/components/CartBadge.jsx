"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function CartBadge() {
  const { data } = useSWR("/api/cart", fetcher, { refreshInterval: 3000 });
  const count = data?.length ?? 0;

  return (
    <Link href="/cart" className="rounded-lg border px-3 py-1 text-sm">
      Cart ({count})
    </Link>
  );
}

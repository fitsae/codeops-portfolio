import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getOrder } from "@/lib/orders-api";
import TanStackOrderStatus from "./TanStackOrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold">Order not found</h1>
      </main>
    );
  }

  const queryClient = getQueryClient();

  // Populate the cache on the server. The client will not re-fetch
  // for staleTime, and the first render is instant.
  await queryClient.prefetchQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Order Status (TanStack Query)</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <TanStackOrderStatus id={id} />
      </HydrationBoundary>
    </main>
  );
}

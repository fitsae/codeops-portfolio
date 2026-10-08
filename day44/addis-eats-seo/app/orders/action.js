"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { findOrder } from "@/lib/orders-data";

export async function cancelOrder(orderId) {
  // 1. Authentication
  const session = await getSession();
  if (!session) throw new Error("Not signed in");

  // 2. Existence
  const order = findOrder(orderId);
  if (!order) throw new Error("Order not found");

  // 3. Authorization — ownership
  if (order.userId !== session.userId) {
    throw new Error("You are not allowed to cancel this order");
  }

  // 4. Effect
  order.status = "Cancelled";
  revalidatePath("/orders");
  return { success: true };
}

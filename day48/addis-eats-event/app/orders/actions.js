"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { findOrder } from "@/lib/orders";

export async function cancelOrder(orderId) {
  const session = await getSession();
  if (!session) throw new Error("Not signed in");

  const order = findOrder(orderId);
  if (!order) throw new Error("Order not found");

  if (order.userId !== session.userId) {
    throw new Error("You are not allowed to cancel this order");
  }

  order.status = "Cancelled";
  revalidatePath("/orders");
  return { success: true };
}

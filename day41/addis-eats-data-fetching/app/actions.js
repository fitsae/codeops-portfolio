"use server";

import { revalidatePath } from "next/cache";
import { cart } from "@/lib/cart";

export async function addToCartAction(formData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name");

  if (!id || !name) {
    return { success: false, error: "Missing id or name." };
  }

  cart.push({ id, name });
  revalidatePath("/cart-sa");
  return { success: true, count: cart.length };
}

"use server";

import { getSession } from "@/lib/session";

export async function placeOrder(prevState, formData) {
  // Authentication is the first check, before any validation.
  const session = await getSession();
  if (!session) {
    return { success: false, error: "You must sign in to place an order." };
  }

  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();

  const errors = {};
  if (!name || name.length < 2) errors.name = "Name is required.";
  if (!phone || !/^09\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Ethiopian phone number (09XXXXXXXX).";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // A real app writes to the DB with session.userId as the owner.
  console.log("Order placed", { userId: session.userId, name, phone });
  return { success: true };
}

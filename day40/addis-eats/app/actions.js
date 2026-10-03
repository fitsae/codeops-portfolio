"use server";

export async function placeOrder(formData) {
  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();

  const errors = {};

  if (!name || name.length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (!phone || !/^09\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Ethiopian phone number (09XXXXXXXX).";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  console.log("Order created:", { name, phone });
  return { success: true };
}

// src/utils/validateCheckout.js

/**
 * Pure validator. Same input → same output, no refs, no state, no I/O.
 * Returns a flat { fieldName: message } object. Empty object = valid.
 *
 * @param {{ name: string, phone: string, area: string, notes: string }} form
 * @returns {Record<string, string>}
 */
export function validate(form) {
  const errors = {};

  // ---- name ----
  const name = form.name.trim();
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // ---- phone (Ethiopian TeleBirr) ----
  const phone = form.phone.replace(/[\s-]/g, "");
  if (!phone) {
    errors.phone = "Please enter your TeleBirr phone number.";
  } else if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    errors.phone =
      "Enter a valid Ethiopian number: 09XXXXXXXX or +2519XXXXXXXX.";
  }

  // ---- area ----
  const area = form.area.trim();
  if (!area) {
    errors.area = "Please enter your delivery area.";
  } else if (area.length < 3) {
    errors.area = "Area must be at least 3 characters.";
  }

  // ---- notes: optional, no rule ----

  return errors;
}

export const CHECKOUT_FIELD_ORDER = ["name", "phone", "area", "notes"];

// src/components/DeliveryForm.jsx
import { useRef, useState } from "react";
import {
  useCartStore,
  selectItems,
  selectTotal,
  selectClear,
} from "../store/cartStore";
import { validate, CHECKOUT_FIELD_ORDER } from "../utils/validateCheckout";

const EMPTY_FORM = { name: "", phone: "", area: "", notes: "" };

function DeliveryForm() {
  // ---- store (narrow selectors) ----
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const clear = useCartStore(selectClear);

  // ---- ONE state object for the whole form ----
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // stable refs for focus management
  const refs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
    notes: useRef(null),
  };

  // ---- errors are DERIVED on every render, not stored ----
  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;
  const canSubmit = !hasErrors && items.length > 0 && !submitting;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function focusFirstInvalid(errs) {
    for (const field of CHECKOUT_FIELD_ORDER) {
      if (errs[field] && refs[field]?.current) {
        refs[field].current.focus();
        return;
      }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // double-send guard #1: early return if a request is in flight
    if (submitting) return;

    // On submit, reveal every error, not just touched ones
    const allTouched = Object.fromEntries(
      CHECKOUT_FIELD_ORDER.map((f) => [f, true]),
    );
    setTouched(allTouched);
    setSubmitError("");

    if (hasErrors) {
      focusFirstInvalid(errors);
      return;
    }

    // double-send guard #2: flip the flag BEFORE awaiting
    setSubmitting(true);

    try {
      const result = await submitOrder({
        customer: form,
        items,
        total,
      });

      if (!result.ok) {
        // Server rejected. Values are untouched → kept.
        setSubmitError(result.message || "Payment failed. Please try again.");
        // If the server pinned the failure to a field, jump to it.
        if (result.field && refs[result.field]?.current) {
          refs[result.field].current.focus();
        }
        return; // finally still runs → submitting flips false
      }

      // success
      clear();
      setForm(EMPTY_FORM);
      setTouched({});
      // In a real app you'd navigate to an order-confirmation route here.
      alert(`Order submitted successfully!\nTotal: ${total} ETB`);
    } catch (err) {
      setSubmitError(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /** Shared props for a field: id, name, value, handlers, ARIA wiring. */
  function fieldProps(name) {
    const showError = Boolean(touched[name] && errors[name]);
    return {
      id: name,
      name,
      value: form[name],
      onChange: handleChange,
      onBlur: handleBlur,
      ref: refs[name],
      "aria-invalid": showError, // boolean
      "aria-describedby": showError ? `${name}-error` : undefined,
      "aria-required": name !== "notes",
    };
  }

  return (
    <section className="delivery-form">
      <h2>Checkout</h2>

      {/* form-level error — polite live region */}
      {submitError && (
        <p className="error-message" role="alert" id="form-error">
          {submitError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* ---------- name ---------- */}
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            placeholder="Abebe Bekila"
          />
          {touched.name && errors.name && (
            <p id="name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* ---------- phone ---------- */}
        <div className="field">
          <label htmlFor="phone">TeleBirr Phone Number</label>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="09XXXXXXXX"
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" className="field-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* ---------- area ---------- */}
        <div className="field">
          <label htmlFor="area">Delivery Area</label>
          <input
            {...fieldProps("area")}
            type="text"
            autoComplete="address-level2"
            placeholder="Bole, Addis Ababa"
          />
          {touched.area && errors.area && (
            <p id="area-error" className="field-error" role="alert">
              {errors.area}
            </p>
          )}
        </div>

        {/* ---------- notes (optional) ---------- */}
        <div className="field">
          <label htmlFor="notes">
            Delivery Notes <span className="optional">(optional)</span>
          </label>
          <textarea
            {...fieldProps("notes")}
            rows={3}
            placeholder="Landmark, gate colour, floor…"
          />
        </div>

        <p className="order-total">
          Order Total: <strong>{total} ETB</strong>
        </p>

        <button type="submit" disabled={!canSubmit}>
          {submitting ? "Processing…" : `Pay ${total} ETB with TeleBirr`}
        </button>
      </form>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Simulated API. Flip the flag to exercise the failure path.
 * ------------------------------------------------------------------ */
async function submitOrder(payload) {
  // eslint-disable-next-line no-console
  console.log("POST /api/orders", payload);
  await new Promise((r) => setTimeout(r, 900));

  // --- success ---
  return { ok: true };

  // --- failure: uncomment one of these to test ---
  // return { ok: false, message: "TeleBirr is temporarily unavailable." };
  // return { ok: false, message: "That phone number is not registered.",
  //          field: "phone" };
}

export default DeliveryForm;

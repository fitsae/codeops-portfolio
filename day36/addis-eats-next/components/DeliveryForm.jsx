"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCartStore,
  selectItems,
  selectTotal,
  selectClear,
} from "@/store/cartStore";

const EMPTY = { name: "", phone: "", area: "" };
const PHONE_RE = /^(?:\+251|0)9\d{8}$/;

export default function DeliveryForm() {
  const router = useRouter();
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const clear = useCartStore(selectClear);

  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const validPhone = PHONE_RE.test(form.phone.replace(/[\s-]/g, ""));
  const canSubmit =
    form.name.trim() &&
    validPhone &&
    form.area.trim() &&
    items.length > 0 &&
    !submitting;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    alert(`Order submitted!\nTotal: ${total} ETB`);
    clear();
    setForm(EMPTY);
    setSubmitting(false);
    router.push("/menu");
  }

  return (
    <section className="delivery-form">
      <h2>Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone">TeleBirr Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="09XXXXXXXX"
          />
          {form.phone && !validPhone && (
            <p className="field-error" role="alert">
              Enter a valid Ethiopian number.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="area">Delivery Area</label>
          <input
            id="area"
            type="text"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          />
        </div>
        <button type="submit" disabled={!canSubmit}>
          {submitting ? "Processing…" : `Pay ${total} ETB with TeleBirr`}
        </button>
      </form>
    </section>
  );
}

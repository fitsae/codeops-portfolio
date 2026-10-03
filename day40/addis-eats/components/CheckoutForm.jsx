"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";

const initialState = { success: false, errors: {} };

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
        {state.errors?.name && (
          <p className="field-error" role="alert">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" />
        {state.errors?.phone && (
          <p className="field-error" role="alert">
            {state.errors.phone}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending}>
        {pending ? "Placing order…" : "Place Order"}
      </button>

      {state.success && (
        <p className="success-msg" role="status">
          Order placed successfully.
        </p>
      )}
    </form>
  );
}

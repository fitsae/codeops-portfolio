"use client";

import { useActionState } from "react";
import { placeOrder } from "./actions";

const initial = { success: false, errors: {} };

export default function PlaceOrderForm() {
  const [state, action, pending] = useActionState(placeOrder, initial);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="w-full rounded-lg border px-4 py-3"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block font-medium">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          className="w-full rounded-lg border px-4 py-3"
          placeholder="09XXXXXXXX"
        />
        {state.errors?.phone && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {state.errors.phone}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-purple-600 px-4 py-3 text-white disabled:opacity-50"
      >
        {pending ? "Placing order…" : "Place order"}
      </button>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700" role="status">
          Order placed successfully.
        </p>
      )}
    </form>
  );
}

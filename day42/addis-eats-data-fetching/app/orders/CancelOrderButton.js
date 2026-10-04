"use client";

import { useState } from "react";
import { cancelOrder } from "./actions";

export default function CancelOrderButton({ orderId }) {
  const [msg, setMsg] = useState("");
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    setMsg("");
    try {
      const result = await cancelOrder(orderId);
      setMsg(result.success ? "Cancelled." : "Failed.");
    } catch (err) {
      setMsg(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="rounded-lg border px-3 py-2 disabled:opacity-50"
      >
        {pending ? "Cancelling…" : "Cancel order"}
      </button>
      {msg && <p className="mt-2 text-sm text-gray-600">{msg}</p>}
    </div>
  );
}

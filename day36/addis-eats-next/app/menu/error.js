"use client";

import { useEffect } from "react";

export default function MenuError({ error, reset }) {
  useEffect(() => {
    console.error("[menu/error]", error);
  }, [error]);

  return (
    <section role="alert" className="error-boundary">
      <h2>Menu hit a snag</h2>
      <p className="error-boundary__msg">{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}

"use client";

import { useState } from "react";

export default function KeyboardDemo() {
  const [message, setMessage] = useState("Press a key.");

  function handleKeyDown(event) {
    if (event.key === "Escape") setMessage("Escape was pressed.");
    else if (event.key === "Enter") setMessage("Enter was pressed.");
    else if (event.key === "ArrowDown") setMessage("Down arrow was pressed.");
  }

  return (
    <main className="wrap">
      <h1>Keyboard Event Demo</h1>

      <label htmlFor="keyboard-input">Focus this field and press a key</label>
      <input
        id="keyboard-input"
        onKeyDown={handleKeyDown}
        style={{ maxWidth: 360 }}
      />

      <p aria-live="polite">{message}</p>

      <p className="muted">
        Use <code>event.key</code>, never <code>event.keyCode</code>.
      </p>
    </main>
  );
}

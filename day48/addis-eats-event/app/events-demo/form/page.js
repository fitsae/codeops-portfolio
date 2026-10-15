"use client";

import { useState } from "react";

export default function FormEventDemo() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`Welcome, ${name}!`);
  }

  return (
    <main className="wrap">
      <h1>Form Event Demo</h1>

      <form onSubmit={handleSubmit} className="panel" style={{ maxWidth: 480 }}>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Submit
        </button>

        <p aria-live="polite">{message}</p>
      </form>
    </main>
  );
}

"use client";

export default function EventsDemoPage() {
  function handleClick(event) {
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
    console.log("Native event:", event.nativeEvent);
  }

  return (
    <main className="wrap">
      <h1>Event Object Demo</h1>
      <p>Open the console, then click the button.</p>

      <button type="button" onClick={handleClick} className="btn-primary">
        <span>Click this text</span>
      </button>

      <p className="muted">
        <code>event.target</code> is the inner span.{" "}
        <code>event.currentTarget</code> is the button.
      </p>
    </main>
  );
}

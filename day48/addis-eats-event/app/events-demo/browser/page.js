"use client";

import { useEffect, useState } from "react";

export default function BrowserDemoPage() {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <main className="wrap">
      <h1>Browser Width</h1>
      <p>
        {width === null
          ? "Reading screen width..."
          : `Window width: ${width}px`}
      </p>
      <p className="muted">
        <code>window</code> is only available in the browser, so it lives inside{" "}
        <code>useEffect</code> in a Client Component.
      </p>
    </main>
  );
}

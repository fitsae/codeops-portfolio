"use client";

import { useEffect, useState } from "react";
import MapPanel from "./MapPanel";
import { etb, when, relative } from "@/lib/format";
import { toCsv, downloadCsv } from "@/lib/csv";

export default function TrackingClient({ order }) {
  const [status, setStatus] = useState(order.status);
  const [updatedAt, setUpdatedAt] = useState(order.placedAt);
  const [connection, setConnection] = useState("connecting");
  const [history, setHistory] = useState(order.history);

  useEffect(() => {
    const source = new EventSource(`/api/orders/${order.id}/stream`);

    // NOTE: do NOT call setConnection("connecting") here — it's the initial state
    // and React 19 flags synchronous setState inside an effect body.

    source.onopen = () => setConnection("live");

    source.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setStatus(update.status);
      setUpdatedAt(update.updatedAt);

      setHistory((previous) => {
        if (
          previous.length > 0 &&
          previous[previous.length - 1].status === update.status
        ) {
          return previous;
        }
        return [...previous, { time: update.updatedAt, status: update.status }];
      });

      if (update.status === "Delivered") {
        setConnection("delivered");
        source.close();
      }
    };

    source.onerror = () => {
      if (source.readyState !== EventSource.CLOSED) {
        setConnection("reconnecting");
      }
    };

    return () => source.close();
  }, [order.id]);

  function exportHistory() {
    downloadCsv(toCsv(history), `order-${order.id}-history.csv`);
  }

  return (
    <main className="tracking-page">
      <h1>Track your delivery</h1>
      <p>Order: {order.id}</p>

      <div className="tracking-grid">
        <section className="panel">
          <h2>Delivery map</h2>
          <MapPanel courier={order.courier} destination={order.destination} />

          <h3>Delivery information</h3>
          <p>Courier: {order.courier.name}</p>
          <p>Destination: {order.address}</p>
          <p>
            Coordinates: {order.destination.latitude},{" "}
            {order.destination.longitude}
          </p>
        </section>

        <section className="panel">
          <h2>Order status</h2>
          <p>
            Current status: <span className="status">{status}</span>
          </p>
          <p>Connection: {connection}</p>
          <p>Last update: {when.format(new Date(updatedAt))}</p>
          <p>Updated {relative(updatedAt)}</p>

          <h3>Order summary</h3>
          <p>Restaurant: {order.restaurant}</p>
          <p>Total: {etb.format(order.total)}</p>
          <p>Order placed: {when.format(new Date(order.placedAt))}</p>

          <h3>Order history</h3>
          <ul>
            {history.map((item, index) => (
              <li key={`item.status-${index}`}>
                <strong>{item.status}</strong> —{" "}
                {when.format(new Date(item.time))}
              </li>
            ))}
          </ul>

          <button onClick={exportHistory}>Export order history</button>

          <CsvUpload />
        </section>
      </div>
    </main>
  );
}

function CsvUpload() {
  const [message, setMessage] = useState("");

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage("File must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Select a CSV file.");
      event.target.value = "";
      return;
    }

    const text = await file.text();
    setMessage(`Read ${file.name}: ${text.length} characters.`);
    event.target.value = "";
  }

  return (
    <section style={{ marginTop: 16 }}>
      <h3>Import a CSV file</h3>
      <label htmlFor="csv-upload">Select order history</label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileChange}
      />
      <p role="status">{message}</p>
    </section>
  );
}

// src/pages/Receipt.jsx
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

function Receipt() {
  const { orderId } = useParams();

  const order = useMemo(() => {
    try {
      const raw = sessionStorage.getItem("last-order");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  if (!order || order.id !== orderId) {
    return (
      <section className="receipt">
        <h2>Order not found</h2>
        <p>We couldn’t find that receipt. It may have expired.</p>
        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="receipt">
      <h2>Thank you, {order.customer.name.split(" ")[0]}!</h2>
      <p>
        Order <code>{order.id.slice(0, 8)}</code> placed{" "}
        {new Date(order.placedAt).toLocaleString()}.
      </p>

      <ul className="receipt__items">
        {order.items.map((item) => (
          <li key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{item.price * item.quantity} ETB</span>
          </li>
        ))}
      </ul>

      <p className="receipt__total">
        Total paid: <strong>{order.total} ETB</strong>
      </p>
      <p>Delivering to: {order.customer.area}</p>
      {order.customer.notes && <p>Notes: {order.customer.notes}</p>}

      <Link to="/menu" className="primary-link">
        Order more
      </Link>
    </section>
  );
}

export default Receipt;

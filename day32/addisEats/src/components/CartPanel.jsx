// src/components/CartPanel.jsx
import {
  useCartStore,
  selectItems,
  selectTotal,
  selectRemove,
  selectClear,
} from "../store/cartStore";

function CartPanel() {
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const remove = useCartStore(selectRemove);
  const clear = useCartStore(selectClear);

  return (
    <section className="cart-panel">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    {item.price} ETB × {item.quantity}
                  </p>
                </div>
                <div>
                  <span>{item.price * item.quantity} ETB</span>
                  <button type="button" onClick={() => remove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: {total} ETB</h3>
          <button type="button" onClick={clear}>
            Clear Cart
          </button>
        </>
      )}
    </section>
  );
}

export default CartPanel;

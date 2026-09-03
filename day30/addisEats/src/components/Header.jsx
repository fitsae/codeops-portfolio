import { useContext } from "react";

import { CartContext } from "../context/cartContext";

function Header() {
  const { itemCount } = useContext(CartContext);

  return (
    <header className="header">
      <div className="container header-content">
        <div>
          <h1>Addis Eats</h1>

          <p>Delicious Ethiopian food delivered to your door.</p>
        </div>

        <div className="cart-badge">
          🛒 Cart
          <span>{itemCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

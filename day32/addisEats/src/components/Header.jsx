// src/components/Header.jsx
import { useCartStore, selectItemCount } from "../store/cartStore";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const itemCount = useCartStore(selectItemCount);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header-content">
        <div>
          <h1>Addis Eats</h1>
          <p>Delicious Ethiopian food delivered to your door.</p>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className="cart-badge">
            🛒 Cart <span>{itemCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

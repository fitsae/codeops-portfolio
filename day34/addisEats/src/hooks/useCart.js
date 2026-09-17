// src/hooks/useCart.js   ← TEMPORARY, delete after Step 4
import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}

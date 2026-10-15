"use client";

import { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* ---------------- Cart ---------------- */

const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

/* ---------------- Providers ---------------- */

export function Providers({ children }) {
  const [items, setItems] = useState([]);

  // One QueryClient per app. Created inside useState so it survives re-renders
  // but is not recreated on every render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const add = (dish) => setItems((prev) => [...prev, dish]);
  const clear = () => setItems([]);

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ items, add, clear }}>
        {children}
      </CartContext.Provider>
    </QueryClientProvider>
  );
}

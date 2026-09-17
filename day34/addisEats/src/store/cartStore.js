// src/store/cartStore.js
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: (dish) =>
          set(
            (state) => {
              const existing = state.items.find((i) => i.id === dish.id);
              if (existing) {
                return {
                  items: state.items.map((i) =>
                    i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
                  ),
                };
              }
              return { items: [...state.items, { ...dish, quantity: 1 }] };
            },
            false,
            "cart/addItem",
          ),

        remove: (id) =>
          set(
            (state) => {
              const existing = state.items.find((i) => i.id === id);
              if (!existing) return state; // same ref → no notify
              if (existing.quantity > 1) {
                return {
                  items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
                  ),
                };
              }
              return { items: state.items.filter((i) => i.id !== id) };
            },
            false,
            "cart/remove",
          ),

        clear: () => set({ items: [] }, false, "cart/clear"),
      }),
      {
        name: "addis-eats-cart",
        version: 1,
        partialize: (s) => ({ items: s.items }), // actions are functions
      },
    ),
    { name: "AddisEatsCart", enabled: import.meta.env.DEV },
  ),
);

/* Narrow selectors — export once, reuse everywhere */
export const selectItems = (s) => s.items;
export const selectAddItem = (s) => s.addItem;
export const selectRemove = (s) => s.remove;
export const selectClear = (s) => s.clear;
export const selectItemCount = (s) =>
  s.items.reduce((n, i) => n + i.quantity, 0);
export const selectTotal = (s) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectIsEmpty = (s) => s.items.length === 0;

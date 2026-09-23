"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === dish.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...dish, quantity: 1 }] };
        }),

      remove: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          if (item.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
              ),
            };
          }
          return { items: state.items.filter((i) => i.id !== id) };
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

/* Narrow selectors */
export const selectItems = (s) => s.items;
export const selectAddItem = (s) => s.addItem;
export const selectRemove = (s) => s.remove;
export const selectClear = (s) => s.clear;
export const selectItemCount = (s) =>
  s.items.reduce((n, i) => n + i.quantity, 0);
export const selectTotal = (s) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

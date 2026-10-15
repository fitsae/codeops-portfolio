// lib/orders.js

export const demoOrder = {
  id: "AE-1042",
  userId: "usr_demo",
  restaurant: "Almaz Kitchen",
  address: "Bole, Addis Ababa, Ethiopia",
  total: 1200,
  placedAt: "2026-10-13T06:30:00.000Z",
  status: "On the way",

  courier: {
    name: "Abebe",
    latitude: 8.995,
    longitude: 38.7896,
  },

  destination: {
    latitude: 8.99,
    longitude: 38.795,
  },

  history: [
    { time: "2026-10-13T06:30:00.000Z", status: "Order received" },
    { time: "2026-10-13T06:35:00.000Z", status: "Preparing" },
    { time: "2026-10-13T06:45:00.000Z", status: "Picked up" },
    { time: "2026-10-13T06:50:00.000Z", status: "On the way" },
  ],
};

// Day 42 — scoped query
export async function getOrderFor(id, userId) {
  if (demoOrder.id !== id) return null;
  if (userId && demoOrder.userId !== userId) return null;
  return demoOrder;
}

// Day 46 — list
export async function getOrders() {
  return [demoOrder];
}

// Day 39 — write
export async function createOrder(data) {
  return { id: "AE-" + Math.floor(1000 + Math.random() * 9000), ...data };
}
// ... existing exports (demoOrder, getOrderFor, getOrders, createOrder) ...

export async function findOrder(orderId) {
  // In production: SELECT * FROM orders WHERE id = $1
  if (demoOrder.id === orderId) return demoOrder;
  return null;
}
// List for a specific user — Day 42 scoped query for the orders page
export async function getOrdersFor(userId) {
  if (!userId) return [];
  if (demoOrder.userId !== userId) return [];
  return [demoOrder];
}

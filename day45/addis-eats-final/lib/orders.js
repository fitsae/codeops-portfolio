export const orders = [
  {
    id: "ord-1",
    userId: "demo-user-1",
    item: "Doro Wot",
    status: "Preparing",
    total: 1250,
    customer: "Abebe",
  },
  {
    id: "ord-2",
    userId: "demo-user-2",
    item: "Tibs",
    status: "Delivered",
    total: 850,
    customer: "Marta",
  },
];

export function getOrdersFor(userId) {
  return orders.filter((o) => o.userId === userId);
}

export function findOrder(id) {
  return orders.find((o) => o.id === id) ?? null;
}

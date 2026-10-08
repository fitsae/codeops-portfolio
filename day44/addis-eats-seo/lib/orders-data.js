// In-memory demo data. Real app: a database.
export const orders = [
  { id: "ord-1", userId: "demo-user-1", item: "Doro Wot", status: "Preparing" },
  { id: "ord-2", userId: "demo-user-2", item: "Tibs", status: "Delivered" },
];

export function getOrdersFor(userId) {
  return orders.filter((o) => o.userId === userId);
}

export function findOrder(id) {
  return orders.find((o) => o.id === id);
}

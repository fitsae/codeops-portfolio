import { orders } from "./orders";

export async function getOrder(id) {
  return orders[id] ?? null;
}

import { findOrder } from "./orders";

export async function getOrder(id) {
  return findOrder(id);
}

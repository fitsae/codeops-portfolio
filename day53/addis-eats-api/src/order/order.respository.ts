import type { Order } from './order.types';

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly store = new Map<number, Order>();

  constructor(initial: Order[] = []) {
    for (const order of initial) this.store.set(order.id, order);
  }

  byId(id: number): Order | undefined {
    return this.store.get(id);
  }

  all(): Order[] {
    return [...this.store.values()];
  }
}

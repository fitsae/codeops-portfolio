import type { Order } from './order.types';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  add(order: Order): void;
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

  add(order: Order): void {
    this.store.set(order.id, order);
  }
}

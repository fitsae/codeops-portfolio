import type { Area, Order } from './order.types';
import { OrderNotFoundError } from './order.errors';
import type { OrderRepository } from './order.repository';

export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

  find(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) throw new OrderNotFoundError(id);
    return order;
  }

  feesByArea(): Record<Area, number> {
    const fees: Record<Area, number> = { north: 0, south: 0, east: 0, west: 0 };
    for (const order of this.repo.all()) {
      fees[order.area] += order.total;
    }
    return fees;
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((order) => order[key]);
  }
}

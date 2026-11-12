import { Inject, Injectable } from '@nestjs/common';
import type { Area, Order } from './order.types';
import { OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY, type OrderRepository } from './order.repository';
import type { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository,
  ) {}

  // --- Day 53, unchanged ---
  find(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) throw new OrderNotFoundError(id);
    return order;
  }

  feesByArea(): Record<Area, number> {
    const fees: Record<Area, number> = { north: 0, south: 0, east: 0, west: 0 };
    for (const order of this.repo.all()) {
      fees[order.area] += order.totalSantim;
    }
    return fees;
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((order) => order[key]);
  }

  // --- thin delegators the controller needs ---
  all(): Order[] {
    return this.repo.all();
  }

  create(dto: CreateOrderDto): Order {
    const id = this.repo.all().reduce((m, o) => Math.max(m, o.id), 0) + 1;
    const order: Order = { id, status: 'pending', ...dto };
    this.repo.add(order);
    return order;
  }
}

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderService } from './orders.service';
import { InMemoryOrderRepository, ORDER_REPOSITORY } from './order.repository';
import { seedOrders } from '../seed-orders';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useFactory: () => new InMemoryOrderRepository(seedOrders),
    },
  ],
})
export class OrdersModule {}

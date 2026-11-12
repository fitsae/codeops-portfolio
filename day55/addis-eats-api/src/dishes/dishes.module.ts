// src/dishes/dish.module.ts
import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import {
  DishService,
  RESTAURANT_LOOKUP,
  RestaurantLookup,
} from './dishes.service';
import { DISH_REPOSITORY, InMemoryDishRepository } from './dish.repository';
import { dishSeed } from '../dishes.seed';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import {
  RESTAURANT_REPOSITORY,
  RestaurantRepository,
} from '../restaurants/restaurant.repository';

@Module({
  imports: [RestaurantsModule],
  controllers: [DishesController],
  providers: [
    {
      provide: DISH_REPOSITORY,
      useValue: new InMemoryDishRepository(dishSeed),
    },
    {
      provide: RESTAURANT_LOOKUP,
      useFactory: (restaurants: RestaurantRepository): RestaurantLookup => ({
        byId: (id) => restaurants.byId(id),
      }),
      inject: [RESTAURANT_REPOSITORY],
    },
    {
      provide: DishService,
      useFactory: (
        dishes: InMemoryDishRepository,
        restaurants: RestaurantLookup,
      ) => new DishService(dishes, restaurants),
      inject: [DISH_REPOSITORY, RESTAURANT_LOOKUP],
    },
  ],
})
export class DishesModule {}

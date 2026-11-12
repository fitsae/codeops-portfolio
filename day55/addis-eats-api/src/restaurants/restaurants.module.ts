import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantService } from './restaurants.service';
import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurant.repository';
import { restaurantSeed } from '../restaurants.seed';

@Module({
  controllers: [RestaurantsController],
  providers: [
    {
      provide: RESTAURANT_REPOSITORY,
      useValue: new InMemoryRestaurantRepository(restaurantSeed),
    },
    {
      provide: RestaurantService,
      useFactory: (repo: InMemoryRestaurantRepository) =>
        new RestaurantService(repo),
      inject: [RESTAURANT_REPOSITORY],
    },
  ],
  exports: [RESTAURANT_REPOSITORY],
})
export class RestaurantsModule {}

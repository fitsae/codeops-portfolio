import type { Restaurant } from './restaurant.types';
import { RestaurantNotFoundError } from './restaurant.errors';
import type {
  ListRestaurantsFilter,
  RestaurantRepository,
} from './restaurant.repository';

export interface CreateRestaurantInput {
  name: string;
  area: Restaurant['area'];
  phone?: string;
}

export class RestaurantService {
  constructor(private readonly restaurants: RestaurantRepository) {}

  all(filter?: ListRestaurantsFilter): Restaurant[] {
    return this.restaurants.all(filter);
  }

  find(id: number): Restaurant {
    const restaurant = this.restaurants.byId(id);
    if (!restaurant) throw new RestaurantNotFoundError(id);
    return restaurant;
  }

  create(input: CreateRestaurantInput): Restaurant {
    const nextId =
      this.restaurants.all().reduce((max, r) => Math.max(max, r.id), 0) + 1;
    const restaurant: Restaurant = { id: nextId, ...input };
    this.restaurants.add(restaurant);
    return restaurant;
  }
}

import type { Dish } from './dish.types';
import { DishNotFoundError, RestaurantNotFoundError } from './dish.errors';
import type { DishRepository } from './dish.repository';

export const RESTAURANT_LOOKUP = Symbol('RESTAURANT_LOOKUP');

/** Minimal contract the service needs from the restaurants resource. */
export interface RestaurantLookup {
  byId(id: number): { id: number } | undefined;
}

export interface CreateDishInput {
  restaurantId: number;
  name: string;
  priceSantim: number;
}

export class DishService {
  constructor(
    private readonly dishes: DishRepository,
    private readonly restaurants: RestaurantLookup,
  ) {}

  all(restaurantId?: number): Dish[] {
    return this.dishes.all(restaurantId);
  }

  find(id: number): Dish {
    const dish = this.dishes.byId(id);
    if (!dish) throw new DishNotFoundError(id);
    return dish;
  }

  create(input: CreateDishInput): Dish {
    if (!this.restaurants.byId(input.restaurantId)) {
      throw new RestaurantNotFoundError(input.restaurantId);
    }
    const nextId =
      this.dishes.all().reduce((max, d) => Math.max(max, d.id), 0) + 1;
    const dish: Dish = { id: nextId, ...input };
    this.dishes.add(dish);
    return dish;
  }
}

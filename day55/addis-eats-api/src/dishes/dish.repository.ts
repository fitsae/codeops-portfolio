import type { Dish } from './dish.types';

export const DISH_REPOSITORY = Symbol('DISH_REPOSITORY');

export interface DishRepository {
  byId(id: number): Dish | undefined;
  all(restaurantId?: number): Dish[];
  add(dish: Dish): void;
}

export class InMemoryDishRepository implements DishRepository {
  private readonly store = new Map<number, Dish>();

  constructor(initial: Dish[] = []) {
    for (const dish of initial) this.store.set(dish.id, dish);
  }

  byId(id: number): Dish | undefined {
    return this.store.get(id);
  }

  all(restaurantId?: number): Dish[] {
    const all = [...this.store.values()];
    return restaurantId === undefined
      ? all
      : all.filter((d) => d.restaurantId === restaurantId);
  }

  add(dish: Dish): void {
    this.store.set(dish.id, dish);
  }
}

import type { Area, Restaurant } from './restaurant.types';

export const RESTAURANT_REPOSITORY = Symbol('RESTAURANT_REPOSITORY');

export type ListRestaurantsFilter = { area?: Area };

export interface RestaurantRepository {
  byId(id: number): Restaurant | undefined;
  all(filter?: ListRestaurantsFilter): Restaurant[];
  add(restaurant: Restaurant): void;
}

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly store = new Map<number, Restaurant>();

  constructor(initial: Restaurant[] = []) {
    for (const r of initial) this.store.set(r.id, r);
  }

  byId(id: number): Restaurant | undefined {
    return this.store.get(id);
  }

  all(filter: ListRestaurantsFilter = {}): Restaurant[] {
    const rows = [...this.store.values()];
    return filter.area === undefined
      ? rows
      : rows.filter((r) => r.area === filter.area);
  }

  add(restaurant: Restaurant): void {
    this.store.set(restaurant.id, restaurant);
  }
}

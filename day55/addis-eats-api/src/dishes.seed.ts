import type { Dish } from './dishes/dish.types';

export const dishSeed: Dish[] = [
  { id: 1, restaurantId: 1, name: 'Doro Wat', priceSantim: 45000 },
  { id: 2, restaurantId: 1, name: 'Tibs', priceSantim: 38000 },
  { id: 3, restaurantId: 2, name: 'Shiro', priceSantim: 18000 },
  { id: 4, restaurantId: 2, name: 'Kitfo', priceSantim: 42000 },
  { id: 5, restaurantId: 3, name: 'Beyaynetu', priceSantim: 22000 },
  { id: 6, restaurantId: 3, name: 'Firfir', priceSantim: 15000 },
  { id: 7, restaurantId: 4, name: 'Chechebsa', priceSantim: 12000 },
  { id: 8, restaurantId: 4, name: 'Ful', priceSantim: 9000 },
];

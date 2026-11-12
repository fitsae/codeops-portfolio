export type Area = 'north' | 'south' | 'east' | 'west';

export type Dish = {
  id: number;
  name: string;
  price: number;
};

export type OrderStatus = 'pending' | 'preparing' | 'delivered' | 'cancelled';

export type Order = {
  id: number;
  phone: string;
  area: Area;
  dishes: Dish[];
  status: OrderStatus;
  total: number;
};

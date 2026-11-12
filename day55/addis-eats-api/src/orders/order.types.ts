export type Area = 'north' | 'south' | 'east' | 'west';

export type OrderStatus = 'pending' | 'preparing' | 'delivered' | 'cancelled';

export type Order = {
  id: number;
  customer: string;
  area: Area;
  phone?: string;
  totalSantim: number;
  status: OrderStatus;
};

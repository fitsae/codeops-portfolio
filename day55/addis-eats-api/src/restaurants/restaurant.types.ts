export type Area = 'north' | 'south' | 'east' | 'west';

export type Restaurant = {
  id: number;
  name: string;
  area: Area;
  phone?: string;
};

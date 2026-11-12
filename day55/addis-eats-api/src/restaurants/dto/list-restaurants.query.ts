import { IsIn, IsOptional } from 'class-validator';
import type { Area } from '../restaurant.types';

export class ListRestaurantsQuery {
  @IsOptional()
  @IsIn(['north', 'south', 'east', 'west'] satisfies Area[])
  area?: Area;
}

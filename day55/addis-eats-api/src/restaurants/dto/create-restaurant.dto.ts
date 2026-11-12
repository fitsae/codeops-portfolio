import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import type { Area } from '../restaurant.types';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsIn(['north', 'south', 'east', 'west'] satisfies Area[])
  area!: Area;

  @IsOptional()
  @Matches(/^\+251[79]\d{8}$/)
  phone?: string;
}

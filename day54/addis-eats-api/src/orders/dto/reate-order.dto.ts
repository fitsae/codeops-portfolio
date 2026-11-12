import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import type { Area } from '../order.types';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customer!: string;

  @IsIn(['north', 'south', 'east', 'west'] satisfies Area[])
  area!: Area;

  @IsInt()
  @Min(1)
  totalSantim!: number;

  @IsOptional()
  @Matches(/^\+251[79]\d{8}$/)
  phone?: string;
}

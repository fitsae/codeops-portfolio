import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateDishDto {
  @IsInt()
  @Min(1)
  restaurantId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(1)
  priceSantim!: number;
}

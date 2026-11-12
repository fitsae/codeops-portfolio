import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DishService } from './dishes.service';
import { DishNotFoundError, RestaurantNotFoundError } from './dish.errors';
import { CreateDishDto } from './dto/create-dish.dto';
import { ListDishesQuery } from './dto/list-dishes.query';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishes: DishService) {}

  @Get()
  findAll(@Query() query: ListDishesQuery) {
    return this.dishes.all(query.restaurantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.dishes.find(id);
    } catch (e) {
      if (e instanceof DishNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Post()
  create(@Body() dto: CreateDishDto) {
    try {
      return this.dishes.create(dto);
    } catch (e) {
      if (e instanceof RestaurantNotFoundError) {
        throw new UnprocessableEntityException(e.message);
      }
      throw e;
    }
  }
}

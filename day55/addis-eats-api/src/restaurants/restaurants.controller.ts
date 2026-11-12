import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantNotFoundError } from './restaurant.errors';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ListRestaurantsQuery } from './dto/list-restaurants.query';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurants: RestaurantService) {}

  @Get()
  findAll(@Query() query: ListRestaurantsQuery) {
    return this.restaurants.all({ area: query.area });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.restaurants.find(id);
    } catch (e) {
      if (e instanceof RestaurantNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Post()
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurants.create(dto);
  }
}

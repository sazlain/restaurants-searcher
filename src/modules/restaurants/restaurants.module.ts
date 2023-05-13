import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurant.schema';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
  ],
  controllers: [],
  providers: [RestaurantsService],
})
export class RestaurantsModule { }
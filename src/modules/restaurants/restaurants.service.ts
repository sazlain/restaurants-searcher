import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Injectable()
export class RestaurantsService {
    constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) { }

    async create(restaurantData: Partial<Restaurant>): Promise<Restaurant> {
        const restaurant = new this.restaurantModel(restaurantData);
        return restaurant.save();
    }

    async show(): Promise<Restaurant[]> {
        return this.restaurantModel.find();
    }
}

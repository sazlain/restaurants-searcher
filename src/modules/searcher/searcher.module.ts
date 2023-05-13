import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant, RestaurantSchema } from '../restaurants/restaurant.schema';
import { Recipe, RecipeSchema } from '../recipes/recipe.schema';
import { RecipesService } from '../recipes/users.service';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Restaurant.name, schema: RestaurantSchema },
            { name: Recipe.name, schema: RecipeSchema }
        ]),
    ],
    controllers: [SearcherController],
    providers: [SearcherService],
})
export class SearcherModule { }
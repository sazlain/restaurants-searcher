import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/modules/posts/post.schema';
import { User } from 'src/modules/users/users.schema';
import { seedPosts } from './models/post.seed';
import { seedUsers } from './models/user.seed';
import { Recipe } from 'src/modules/recipes/recipe.schema';
import { seedRecipes } from './models/recipe.seed';
import { Restaurant } from 'src/modules/restaurants/restaurant.schema';
import { seedRestaurants } from './models/restaurant.seed';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<Post>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
        @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>
    ) { }

    async runSeeds(): Promise<void> {
        await seedPosts(this.postModel);
        await seedUsers(this.userModel);
        await seedRecipes(this.recipeModel);
        await seedRestaurants(this.restaurantModel, this.recipeModel);
    }
}
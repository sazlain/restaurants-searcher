import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { User, UserSchema } from 'src/modules/users/users.schema';
import { Post, PostSchema } from 'src/modules/posts/post.schema';
import { Recipe, RecipeSchema } from 'src/modules/recipes/recipe.schema';
import { Restaurant, RestaurantSchema } from 'src/modules/restaurants/restaurant.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Post.name, schema: PostSchema },
            { name: User.name, schema: UserSchema },
            { name: Recipe.name, schema: RecipeSchema },
            { name: Restaurant.name, schema: RestaurantSchema }
        ]),
    ],
    providers: [SeedService],
})

export class SeedsModule { }
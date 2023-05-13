import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Recipe, RecipeSchema } from '../recipes/recipe.schema';

@Schema()
export class Restaurant extends Document {

    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop()
    name: string;

    @Prop()
    specialtyFoodType: string;

    @Prop()
    secondarySpecialitiesFoodType: string;

    @Prop()
    attributes: string;

    @Prop()
    qualification: number;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: Recipe.name }],
    })
    @Type(() => Recipe)
    recipes: Recipe[];

    @Prop()
    recomendationTotalPoints: number;

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
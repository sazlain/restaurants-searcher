import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';

@Schema()
export class Recipe extends Document {

    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop()
    name: string;

    @Prop()
    ingredients: string;

    @Prop()
    ingredientsFree: string;

    @Prop()
    price: number;

    @Prop()
    qualification: number;

    @Prop()
    restaurantName: string;

    @Prop()
    isSpecialtyFoodType: boolean;

    @Prop()
    isSecondarySpecialitiesFoodType: boolean;

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../recipes/recipe.schema';
import { Restaurant } from '../restaurants/restaurant.schema';

@Injectable()
export class SearcherService {

    restaurantQualificationPoints: number = 50;
    restaurantQualificationRecipePoints: number = 20;
    specialtyFoodTypePoints: number = 200;
    secondarySpecialitiesFoodTypePoints: number = 150;
    restaurantAttributesPoints: number = 10;
    recipeIngredientesPoints: number = 10;
    recipeIngredientesFreePoints: number = 200;

    constructor(
        @InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>,
        @InjectModel(Recipe.name) private readonly recipetModel: Model<Recipe>
    ) {


    }

    async show(criteria: string, excludes: string): Promise<Restaurant> {
        return this.recomendationAlgoritm(criteria ? criteria.split(',') : [], excludes ? excludes.split(',') : []);
    }


    async recomendationAlgoritm(criteria: string[], exlude: string[]): Promise<Restaurant> {

        const restaurants: Restaurant[] = await this.restaurantModel.find().populate('recipes');

        const aux: Restaurant[] = restaurants.map((restaurant: Restaurant) => {

            let recomendationTotalPoints = 0;

            recomendationTotalPoints += this.calulateRestQualifPoits(restaurant);
            recomendationTotalPoints += this.calulateRecipQualifPoits(restaurant);
            recomendationTotalPoints += this.calculateSpecialtyFoodTypePoints(criteria, restaurant);
            recomendationTotalPoints += this.calculateAttributePoints(criteria, restaurant);
            recomendationTotalPoints += this.calculateIngredientPoints(criteria, restaurant);
            recomendationTotalPoints += this.calculateIngredientFreePoints(exlude, restaurant);

            restaurant.recomendationTotalPoints = recomendationTotalPoints;
            return restaurant;
        });

        return aux.sort((a, b) => b.recomendationTotalPoints - a.recomendationTotalPoints)[0];
    }

    calulateRestQualifPoits(restaurant: Restaurant): number {
        return (restaurant.qualification * this.restaurantQualificationPoints) / 5;
    }

    calulateRecipQualifPoits(restaurant: Restaurant): number {
        let points = 0;
        const countRecipes = restaurant.recipes.length;

        let recipesSumQualification = 0;

        restaurant.recipes.forEach((recipe) => {
            recipesSumQualification += recipe.qualification;
        });

        return ((recipesSumQualification / countRecipes) * this.restaurantQualificationRecipePoints) / 5;
    }

    calculateSpecialtyFoodTypePoints(criteria: string[], restaurant: Restaurant): number {

        let points = 0;

        criteria.forEach((cr) => {
            if (restaurant.specialtyFoodType.toLowerCase().indexOf(cr.toLowerCase()) > -1) {
                points = this.specialtyFoodTypePoints;
            }

            if (restaurant.secondarySpecialitiesFoodType.toLowerCase().indexOf(cr.toLowerCase()) > -1) {
                points = this.secondarySpecialitiesFoodTypePoints;
            }
        })

        return points;
    }

    calculateAttributePoints(criteria: string[], restaurant: Restaurant): number {

        let points = 0;

        criteria.forEach((cr) => {
            if (restaurant.attributes.toLowerCase().indexOf(cr.toLowerCase()) > -1) {
                points += this.restaurantAttributesPoints;
            }
        })

        return points;
    }

    calculateIngredientPoints(criteria: string[], restaurant: Restaurant): number {

        let points = 0;

        criteria.forEach((cr) => {
            restaurant.recipes.forEach((recipe: Recipe) => {
                recipe.ingredients.split(',').forEach((ingredient: string) => {
                    if (ingredient.toLowerCase().indexOf(cr.toLowerCase()) > -1) {
                        points += this.recipeIngredientesPoints;
                    }
                })
            })
        })

        return points;
    }

    calculateIngredientFreePoints(exclude: string[], restaurant: Restaurant): number {

        let points = 0;

        exclude.forEach((cr) => {
            restaurant.recipes.forEach((recipe: Recipe) => {
                recipe.ingredientsFree.split(',').forEach((ingredient: string) => {
                    if (ingredient.toLowerCase().indexOf(cr.toLowerCase()) > -1) {
                        points += this.recipeIngredientesFreePoints;
                    }
                })
            })
        })

        return points;
    }

}
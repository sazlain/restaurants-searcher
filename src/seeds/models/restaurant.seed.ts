import { Model } from 'mongoose';
import { timeout } from 'rxjs';
import { Recipe } from 'src/modules/recipes/recipe.schema';
import { Restaurant } from 'src/modules/restaurants/restaurant.schema';

export const seedRestaurants = async (restaurantModel: Model<Restaurant>, recipeModel: Model<Recipe>): Promise<void> => {
    let aux = [];
    let restaurant = [
        {
            name: 'Comida Oriental',
            specialtyFoodType: 'Suchi',
            secondarySpecialitiesFoodType: 'Pollo',
            attributes: 'Saludable, Fresco, Arroz, Vegetales',
            qualification: 3,
            recipes: []
        },
        {
            name: 'Fast Food',
            specialtyFoodType: 'Hamburguesas',
            secondarySpecialitiesFoodType: 'Perro Caliente',
            attributes: 'Carbohidratos, Grasas, Vegetales',
            qualification: 4,
            recipes: []
        },
        {
            name: 'Comida Italiana',
            specialtyFoodType: 'Pastas',
            secondarySpecialitiesFoodType: 'Pizza',
            attributes: 'Carbohidratos, Grasas, Salsas, Familiar',
            qualification: 5,
            recipes: []
        }
    ];

    setTimeout(() => {
        restaurant.forEach(async (restaurant) => {

            const { name } = restaurant;

            aux = await restaurantModel.find({ name });


            if (aux.length === 0) {

                const restaurantRecipes: Recipe[] = await recipeModel.find({ restaurantName: restaurant.name });

                restaurantRecipes.forEach((restaurantRecipe: Recipe) => {
                    restaurant.recipes.push(restaurantRecipe._id);
                });

                await restaurantModel.create(restaurant);

            }
        });
    }, 5000);
};
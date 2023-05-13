import { Model } from 'mongoose';
import { Recipe } from 'src/modules/recipes/recipe.schema';

export const seedRecipes = async (recipeModel: Model<Recipe>): Promise<void> => {
    let aux = [];
    let recipes = [
        {
            name: 'Sushi',
            ingredients: 'pescado, arroz, gengibre, nori, salsa de soya, wasabi',
            ingredientsFree: 'gluten',
            price: 20,
            qualification: 5,
            restaurantName: 'Comida Oriental',
            isSpecialtyFoodType: true,
            isSecondarySpecialitiesFoodType: false

        },
        {
            name: 'Nasi Goreng de pollo',
            ingredients: 'pollo, arroz, yogurt, vegetales',
            ingredientsFree: 'pimienta, picante',
            price: 15,
            qualification: 3,
            restaurantName: 'Comida Oriental',
            isSpecialtyFoodType: false,
            isSecondarySpecialitiesFoodType: true
        },
        {
            name: 'Pollo con almendras',
            ingredients: 'pollo, almendras, salsa de soya, perejil, limon, cebolla',
            ingredientsFree: 'arroz',
            price: 15,
            qualification: 3,
            restaurantName: 'Comida Oriental',
            isSpecialtyFoodType: false,
            isSecondarySpecialitiesFoodType: true
        },
        {
            name: 'Hamburguesa de Pollo',
            ingredients: 'pollo, vegetales, jamon, queso chedar, salsas',
            ingredientsFree: 'penilillo, picante',
            price: 12,
            qualification: 5,
            restaurantName: 'Fast Food',
            isSpecialtyFoodType: true,
            isSecondarySpecialitiesFoodType: false
        },
        {
            name: 'Hamburguesa de Carne',
            ingredients: 'carne, vegetales, jamon, queso chedar, salsas',
            ingredientsFree: 'penilillo, picante',
            price: 10,
            qualification: 4,
            restaurantName: 'Fast Food',
            isSpecialtyFoodType: true,
            isSecondarySpecialitiesFoodType: false
        },
        {
            name: 'Hamburguesa Vegana',
            ingredients: 'tofu, chanpiñones, salsa de soya, perejil, vegetales',
            ingredientsFree: 'carne, pollo',
            price: 15,
            qualification: 5,
            restaurantName: 'Fast Food',
            isSpecialtyFoodType: true,
            isSecondarySpecialitiesFoodType: false
        },
        {
            name: 'Perro caliente',
            ingredients: 'salgicha alemana, vegetales, queo chedar, salsas',
            ingredientsFree: 'carne, pollo',
            price: 9,
            qualification: 3,
            restaurantName: 'Fast Food',
            isSpecialtyFoodType: false,
            isSecondarySpecialitiesFoodType: true
        },
        {
            name: 'Pasta Carbonara',
            ingredients: 'espaguetis, queso parmesano, tocineta, salsa carbonara',
            ingredientsFree: 'carne, pollo',
            price: 10,
            qualification: 5,
            restaurantName: 'Comida Italiana',
            isSpecialtyFoodType: true,
            isSecondarySpecialitiesFoodType: false
        },
        {
            name: 'Pasta Alfredo',
            ingredients: 'fettuccine, queso parmesano, salsa alfredo',
            ingredientsFree: 'carne, pollo',
            price: 10,
            qualification: 2,
            restaurantName: 'Comida Italiana',
            isSpecialtyFoodType: true,
            isSecondarySpecialitiesFoodType: false
        },
        {
            name: 'Pizza especial',
            ingredients: 'Peperoni, queso, salsa de la casa, jamon, chanpiñoes',
            ingredientsFree: 'carne, pollo',
            price: 10,
            qualification: 3,
            restaurantName: 'Comida Italiana',
            isSpecialtyFoodType: false,
            isSecondarySpecialitiesFoodType: true
        },

    ];

    recipes.forEach(async (recipe) => {
        aux = await recipeModel.find(recipe);

        if (aux.length === 0) {
            await recipeModel.create(recipe);
        }

    })
};
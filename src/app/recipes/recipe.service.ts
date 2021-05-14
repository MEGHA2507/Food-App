import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { shoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Recipe 1',
    //      'A New Recipe', 
    //      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU',
    //      [ new Ingredients('Meat', 1), new Ingredients('Cheese', 2)]),
    //     new Recipe('Recipe 2',
    //      'A New Recipe',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU',
    //       [ new Ingredients('Fish', 1), new Ingredients('Sauce', 2)]),
    //     new Recipe('Recipe 3',
    //      'A New Recipe',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU',
    //       [ new Ingredients('Pasta', 1), new Ingredients('mayonese', 2)]),
    // ];

    private recipes: Recipe[] = [];


    constructor(private shoppingService: shoppingListService){}

    getRecipes(){
        return this.recipes.slice(); // directly returns the reference of the recipe array. so if we 
        //change something on the array we will change something on the service. so it will return a new array 
        // which is exact copy of the recipe in the service file. 
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addToShoppingList(ingredient: Ingredients[]){
        this.shoppingService.addshoppingIngredients(ingredient);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updatedRecipe(index: number, newrecipe:Recipe){
        this.recipes[index] = newrecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }

    setRecipes(recipe:Recipe[]){
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

}
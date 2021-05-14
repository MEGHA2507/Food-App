import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class DataStorageService{
    constructor(
        private http: HttpClient,
        private recipeService : RecipeService
    ){}

    storeRecipes(){
        const recipe = this.recipeService.getRecipes();
        this.http.put('https://foodbookapp-72031-default-rtdb.firebaseio.com/recipes.json', recipe).subscribe((res) => {
            console.log(res);
        })
    }

    fetchRecipe(){
        return this.http.get<Recipe[]>('https://foodbookapp-72031-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipe => {
                return recipe.map(recipe =>{
                    return { ...recipe,
                    ingredients: recipe.ingredient ? recipe.ingredient : []
                    };
                });
            }),
            tap((recipe) => {
                this.recipeService.setRecipes(recipe);
            })
        )
       
        // .subscribe((res) =>{
        //     console.log(res);
        //     this.recipeService.setRecipes(res);
        // })
    }



}
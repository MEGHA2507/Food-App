import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
    providedIn:'root'
})

export class DataStorageService{
    constructor(
        private http: HttpClient,
        private recipeService : RecipeService,
        private authService : AuthService
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
    }



}
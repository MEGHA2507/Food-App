import { Ingredients } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class shoppingListService{
    ingredientsChanged = new EventEmitter<Ingredients[]>();
    private ingredients: Ingredients[] = [
        new Ingredients('Apple' , 5),
        new Ingredients('Banana' , 7)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredients){
        this.ingredients.push(ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addshoppingIngredients(ingredients : Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

}
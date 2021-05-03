import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class shoppingListService{
    ingredientsChanged = new Subject<Ingredients[]>();
    startedEditingIngredients = new Subject<number>();
    
    private ingredients: Ingredients[] = [
       
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(ingredients){
        this.ingredients.push(ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addshoppingIngredients(ingredients : Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updatedIngredients(index:number, newIngredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients = this.ingredients.slice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}
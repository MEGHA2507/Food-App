import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class shoppingListService{
    ingredientsChanged = new Subject<Ingredients[]>();
    private ingredients: Ingredients[] = [
        new Ingredients('Apple' , 5),
        new Ingredients('Banana' , 7)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredients){
        this.ingredients.push(ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addshoppingIngredients(ingredients : Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}
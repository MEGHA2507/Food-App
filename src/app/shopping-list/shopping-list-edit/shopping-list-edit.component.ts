import { Component, ElementRef, EventEmitter, OnInit, ViewChild , Output, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from '../../shared/ingredients.model';
import { shoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.less']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editIngredientIndex : number;
  editedIngredient :Ingredients;
  @ViewChild('f', {static: false}) shoppingListForm : NgForm;
  
  constructor(private shoppingService: shoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditingIngredients.subscribe((index:number) =>{
      this.editMode = true;
      this.editIngredientIndex = index;
      this.editedIngredient = this.shoppingService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      })
    })
  }

 onAddItem(form : NgForm){
   console.log(form);
   const ingredient = new Ingredients(form.value.name, form.value.amount);
   if(this.editMode === true){
     this.shoppingService.updatedIngredients(this.editIngredientIndex,ingredient);
   }else{
    this.shoppingService.addIngredient(ingredient);
   }
   this.editMode = false;
   this.shoppingListForm.reset();
   
 }

 onClear(){
  this.shoppingListForm.reset();
  this.editMode = false;
 }

 onDelete(){
   console.log(this.editIngredientIndex);
   this.shoppingService.deleteIngredient(this.editIngredientIndex);
   this.onClear();
 }

 ngOnDestroy(){
  this.subscription.unsubscribe();
 }

}

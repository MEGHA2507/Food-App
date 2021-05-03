import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { shoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[];
  private subscription : Subscription;

  // = [
  //   new Ingredients('Apple' , 5),
  //   new Ingredients('Banana' , 7)
  // ];

  constructor(private shoppingService: shoppingListService) { }
 
  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged
    .subscribe((ingredients) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(i:number){
    this.shoppingService.startedEditingIngredients.next(i);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.less']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] = [
    new Ingredients('Apple' , 5),
    new Ingredients('Banana' , 7)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient : Ingredients){
    this.ingredients.push(ingredient);
  }  

}

import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() selectedRecipeItem = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  selectedRecipe(){
    // console.log(recipeItem.target);
    this.selectedRecipeItem.emit();
  }

}

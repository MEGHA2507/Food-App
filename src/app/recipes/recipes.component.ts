import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {
  selectRecipeItem: Recipe;

  // @Output() selectedRecipeDetails = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelect(recItem: Recipe){
    // console.log(recItem);
    this.selectRecipeItem = recItem;
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from './recipe.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectRecipeItem: Recipe;

  // @Output() selectedRecipeDetails = new EventEmitter<Recipe>();

  constructor(private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected
    .subscribe((recipe: Recipe) => {
      this.selectRecipeItem = recipe;
    })
  }

  // onRecipeSelect(recItem: Recipe){
  //   // console.log(recItem);
  //   // this.selectRecipeItem = recItem;
  // }

}

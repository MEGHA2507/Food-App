import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit {

  // @Output() recipeItemSelected = new EventEmitter<Recipe>();

  recipes: Recipe[];
  //  = [
  //   new Recipe('Recipe 1', 'A New Recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU'),
  //   new Recipe('Recipe 2', 'A New Recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU'),
  //   new Recipe('Recipe 3', 'A New Recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU'),
  // ];
  constructor(private recipeService: RecipeService) { 
    
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelect(recipe: Recipe){
    // console.log(recipe);
    // this.recipeItemSelected.emit(recipe);
  }

}

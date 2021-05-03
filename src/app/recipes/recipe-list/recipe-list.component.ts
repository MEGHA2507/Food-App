import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // @Output() recipeItemSelected = new EventEmitter<Recipe>();
  subscription: Subscription;

  recipes: Recipe[];
  //  = [
  //   new Recipe('Recipe 1', 'A New Recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU'),
  //   new Recipe('Recipe 2', 'A New Recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU'),
  //   new Recipe('Recipe 3', 'A New Recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4h5QHFEW1s-QkvkDloZE0Ib-ffDHa9Gdwog&usqp=CAU'),
  // ];
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe((recipe: Recipe[]) =>{
      this.recipes = recipe;
    })
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelect(recipe: Recipe){
    // console.log(recipe);
    // this.recipeItemSelected.emit(recipe);
  }

  OnRecipeClick(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

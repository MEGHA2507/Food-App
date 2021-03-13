import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.less']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Output() selectedRecipeItem = new EventEmitter();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
  }

  selectedRecipe(){
    // console.log(recipeItem.target);
    // this.selectedRecipeItem.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}

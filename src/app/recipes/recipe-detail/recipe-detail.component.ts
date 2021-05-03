import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe : Recipe;
  recipe : Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private router: ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe.ingredient);
  }

  onEditRecipe(){
    this.route.navigate(['edit'], {relativeTo: this.router});
    // this.route.navigate(['../',this.id,'edit'], {relativeTo: this.router});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate(['../recipes']);
  }
}

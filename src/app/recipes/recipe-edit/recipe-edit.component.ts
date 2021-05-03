import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit{
  id: number;
  editMode = false;
  recipeEditForm : FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params:Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initRecipeForm();
    })
    
  }

  initRecipeForm(){

    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imgUrl;
      recipeDescription = recipe.desc;

      if(recipe['ingredient']){
        for(let el of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(el.name, Validators.required),
              amount: new FormControl(el.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeEditForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      desc: new FormControl(recipeDescription, Validators.required),
      imgUrl: new FormControl(recipeImage, Validators.required),
      ingredient:  recipeIngredients
    })
  }

  get recipeIngredientArray(){
    return <FormArray>this.recipeEditForm.controls.ingredient
  }

  onSubmit(){
    const newRecipe = new Recipe(this.recipeEditForm.value['name'], this.recipeEditForm.value['desc'],
    this.recipeEditForm.value['imgUrl'], 
     this.recipeEditForm.value['ingredient']);


    if(this.editMode){
      this.recipeService.updatedRecipe(this.id, newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredients(){
    (<FormArray>this.recipeEditForm.get('ingredient')).push(
      new FormGroup({
        name : new FormControl('', Validators.required),
        amount : new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onIngredientDelete(index){
    (<FormArray>this.recipeEditForm.get('ingredient')).removeAt(index);
    // (<FormArray>this.recipeEditForm.get('ingredients')).clear();
  }

}

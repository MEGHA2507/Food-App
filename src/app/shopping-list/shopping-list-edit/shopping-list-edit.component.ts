import { Component, ElementRef, EventEmitter, OnInit, ViewChild , Output} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.less']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput', {static:true}) inputName : ElementRef;
  @ViewChild('amountInput', {static: true}) inputAmount : ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredients>();
  
  constructor() { }

  ngOnInit(): void {
  }

  addIngredients(){
    const inpName = this.inputName.nativeElement.value;
    const inpAmount = this.inputAmount.nativeElement.value;
    const newIngridient = new Ingredients(inpName, inpAmount);
    this.ingredientAdded.emit(newIngridient);
  }

}

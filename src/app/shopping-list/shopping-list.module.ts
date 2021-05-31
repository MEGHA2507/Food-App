import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModules } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports:[
        RouterModule,
        FormsModule,
        ShoppingListRoutingModule,
        SharedModules
    ],

})
export class ShoppingListModule{}
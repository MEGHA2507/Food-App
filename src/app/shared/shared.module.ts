import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DataStorageService } from "./data-storage.service";
import { DropdownDirective } from "./dropdown.directive";
import { Ingredients } from "./ingredients.model";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent, 
        DropdownDirective,
        // Ingredients,
        PlaceholderDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        // DataStorageService,
        DropdownDirective,
        // Ingredients,
        PlaceholderDirective,
        CommonModule
    ],
    // providers:[ DataStorageService ]
     // entryComponents: [AlertComponent]
})
export class SharedModules{}
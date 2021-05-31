import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipesResolverService } from "./recipes/recipe-resolver.service";
import { RecipeService } from "./recipes/recipe.service";
import { shoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [
        shoppingListService, RecipeService, RecipesResolverService, {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,
            multi: true
          }
    ]
})
export class CoreModule{}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { AuthComponent } from './auth/auth.component';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModules } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // RecipesModule,
    // ShoppingListModule,
    SharedModules,
    CoreModule,
    // AuthModule
  ],
  // providers: [shoppingListService, RecipeService, RecipesResolverService, {
  //   provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }

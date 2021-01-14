import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'FoodShopApp';
  loadedFeature = 'Recipes';

  onNavigate(feature: any){
    // console.log(feature);
    this.loadedFeature = feature;
  }


}

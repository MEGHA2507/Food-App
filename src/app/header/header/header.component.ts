import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() selectTab = new EventEmitter<string>();
  
  constructor(
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
  }

  selectedTab(tab: any){
   
    // if(tab.target.textContent === 'Recipes'){
    //   console.log('Recipe was clicked');
      this.selectTab.emit(tab.target.textContent.toString());

    // }else{
    //   console.log('Shopping List was clicked');
    //   this.selectTab.emit(tab.target.textContent);
    // }
  }

  onSave(){
    this.dataStorageService.storeRecipes();
  }

  onFetch(){
    this.dataStorageService.fetchRecipe().subscribe();
  }
}

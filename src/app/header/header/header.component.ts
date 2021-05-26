import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() selectTab = new EventEmitter<string>();
  userSubscription : Subscription;
  isAuthenticated = false;
  
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false: true;
      // this.isAuthenticated = !!user;
    });
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

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() selectTab = new EventEmitter<string>();
  
  constructor() { }

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
}

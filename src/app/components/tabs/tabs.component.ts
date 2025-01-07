import { Component } from '@angular/core';
import { SearchTabComponent } from '../search-tab/search-tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  
  tabs: SearchTabComponent[] = [];

  constructor() { }

  addTab(tab:SearchTabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:SearchTabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true
  }

}

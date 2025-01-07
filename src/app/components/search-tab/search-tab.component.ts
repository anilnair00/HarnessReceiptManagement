import { Component, Input } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.scss']
})
export class SearchTabComponent {

  @Input() tabTitle: string | undefined;
  active: boolean | undefined;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this);
  }

}

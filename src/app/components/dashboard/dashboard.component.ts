import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public isExact: boolean = false;
  public searchData: Observable<any> = new Observable();
  public showLng = false;
  public showHelp = false;
  public showUserMenu = false;
  public tabsSec: string = '';
  public langChange: boolean = false;

  username = this.app.user.account?.name;

  constructor(public translate: TranslateService, public app: AppService) {}

  ngOnInit(): void {
    let currentLng = localStorage.getItem('language')
      ? localStorage.getItem('language')
      : 'en';
    if (currentLng) {
      this.translate.use(currentLng);
    } else {
      this.translate.use('en');
    }
    this.app.login();
  }

  userLanguage(language: string) {
    this.langChange = !this.langChange;
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.toggleLng();
  }

  toggleLng() {
    this.showLng = !this.showLng;
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  getTabTitle = (tabTitles: string) => {
    this.tabsSec = tabTitles;
  };

  onReset() {
    this.searchData = new Observable();
  }
}

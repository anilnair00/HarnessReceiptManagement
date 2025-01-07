import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService, SearchParams } from 'src/app/services/app.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  public searchParams: SearchParams = {
    content: '',
    first_name: '',
    last_name: '',
    name: '',
    ticket_number: '',
    document_number: '',
    document_connection: '',
    booking_reference: '',
    flight: '',
    flight_date: null,
    issuing_date_start: null,
    issuing_date_end: null,
    date: null,
    departure_city: '',
    arrival_city: '',
    type: '',
    email: '',
    mailto: '',
    mailfrom: '',
    subject: '',
    receipt_sent_date: new Date(),
  };

  public isExact: boolean = false;
  SingleSearch = 'Single Search';
  searching = false;

  public searchData: Array<SearchParams> = new Array();

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
  }

  doSearch() {
    let searchResults = new Array();
    this.searchData = new Array();
    this.searching = true;
    this.app.showMessage = true;
    this.app
      .search(this.searchParams, {}, this.isExact)
      .subscribe((response) => {
        this.app.showMessage = false;
        searchResults.push(response);
        for (let data of searchResults) {
          for (let innerData of data.value) this.searchData.push(innerData);
        }
      });
  }

  onReset() {
    this.searchData = [];
    this.searching = false;
    this.searchParams = {
      content: '',
      first_name: '',
      last_name: '',
      name: '',
      ticket_number: '',
      document_number: '',
      document_connection: '',
      booking_reference: '',
      flight: '',
      flight_date: null,
      issuing_date_start: null,
      issuing_date_end: null,
      date: null,
      departure_city: '',
      arrival_city: '',
      type: '',
      email: '',
      mailto: '',
      mailfrom: '',
      subject: '',
      receipt_sent_date: new Date(),
    };
  }
}

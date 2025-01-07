import { Component, Injectable, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService, NewSearchParams } from 'src/app/services/app.service';
import { NativeDateAdapter, DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
@Injectable({ providedIn: 'root' })
class FormatDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    const dateStr = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    return dateStr!;
  }

  parse(value: any): Date | null {
    let date;
    try {
      const dateStr = new DatePipe('en-US').transform(value, 'yyyy-MM-dd');
      const year = parseInt(dateStr!.slice(0, 4));
      const month = parseInt(dateStr!.slice(5, 7)) - 1;
      const day = parseInt(dateStr!.slice(8, 10));
      date = new Date(year, month, day);
    } catch (e) {
      console.error('Please enter a valid date format YYYY-MM-DD', e);
    }
    return date ? date : null;
  }
}

@Component({
  selector: 'app-index-search',
  templateUrl: './index-search.component.html',
  styleUrls: ['./index-search.component.scss'],
  providers: [{ provide: DateAdapter, useClass: FormatDateAdapter }],
})
export class IndexSearchComponent implements OnInit, OnChanges {
  constructor(
    public translate: TranslateService,
    public app: AppService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  @Input() langChange!: boolean;

  searching = false;
  public searchParams: NewSearchParams = {
    booking_reference: '',
    document_connection: '',
    document_issue_date: null,
    ticket_document_number: '',
    document_type: '',
    context: '',
    email_recipient: '',
    email_sender: '',
    email_sent_date: null,
    email_subject: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    ticket_issue_date: null,
    issuing_date_start: null,
    issuing_date_end: null,
    flight_number: '',
    airport_code: '',
    first_travel_date_start: null,
    first_travel_date_end: null,
    city_name: '',
  };

  public searchData: Array<any> = new Array();

  ngOnInit(): void {
    const currentLng = localStorage.getItem('language')
      ? localStorage.getItem('language')
      : 'en';
    if (currentLng) {
      this.translate.use(currentLng);
      this.dateAdapter.setLocale(currentLng);
    } else {
      this.translate.use('en');
    }
  }

  ngOnChanges(): void {
    const currentLng = localStorage.getItem('language');
    this.dateAdapter.setLocale(currentLng);
  }

  /**
   * Format MUI date picker value to yyyy-mm-dd to match index format
   * @param event date picker event
   */
  formatDate(date: string | null) {
    const formattedDate = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    return formattedDate;
  }

  /**
   * On click submit send searchParams to receipt index
   * store results in array to display in results-table
   */
  doSearch() {
    this.searching = true;
    this.app.showMessage = true;
    // Format search param dates to yyyy-mm-dd
    const searchParams: NewSearchParams = { ...this.searchParams };
    searchParams.issuing_date_end = this.formatDate(
      this.searchParams.issuing_date_end
    );
    searchParams.issuing_date_start = this.formatDate(
      this.searchParams.issuing_date_start
    );
    searchParams.first_travel_date_start = this.formatDate(
      this.searchParams.first_travel_date_start
    );
    searchParams.first_travel_date_end = this.formatDate(
      this.searchParams.first_travel_date_end
    );
    const searchResults = new Array();
    this.searchData = new Array();
    this.app.newIndexSearch(searchParams).subscribe((response) => {
      this.app.showMessage = false;
      searchResults.push(response);
      for (const data of searchResults) {
        for (const innerData of data.value) {
          this.searchData.push(innerData);
        }
      }
    });
  }

  /**
   * Empty searchParams and clear search results
   */
  onReset() {
    this.searchData = [];
    this.searching = false;
    this.searchParams = {
      booking_reference: '',
      document_connection: '',
      document_issue_date: null,
      ticket_document_number: '',
      document_type: '',
      context: '',
      email_recipient: '',
      email_sender: '',
      email_sent_date: null,
      email_subject: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      ticket_issue_date: null,
      issuing_date_start: null,
      issuing_date_end: null,
      flight_number: '',
      airport_code: '',
      first_travel_date_start: null,
      first_travel_date_end: null,
      city_name: '',
    };
  }
}

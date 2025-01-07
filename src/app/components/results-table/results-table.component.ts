import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnChanges, AfterViewChecked {
  @Input() searchData!: Array<any>;
  @Input() searching!: boolean;
  @Input() searchType!: string | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = new Array();
  bulk = 'bulk';

  constructor(public translate: TranslateService, public app: AppService) {}

  ngOnChanges() {
    this.dataSource.data = this.searchData;
    this.dataSource.paginator = this.dataSource.paginator
      ? null
      : this.paginator;
    if (this.searchType === 'Single Search') {
      this.displayedColumns = [
        'pnr',
        'firstname',
        'lastname',
        'ticket-number',
        'issuing_date',
        'document-number',
        'type',
        'subject',
        'email',
        'receipt_sent_date',
        'file',
      ];
    } else if (this.searchType === 'bulk') {
      this.displayedColumns = ['file', 'completion_time'];
    } else {
      this.displayedColumns = [
        'pnr',
        'passenger_names',
        'ticket_numbers',
        'ticket_issue_date',
        'document_numbers',
        'document_types',
        'email_subject',
        'email_recipient',
        'first_travel_date',
        'flight_numbers',
        'airport_codes',
        'city_names',
        'email_sent_date',
        'file',
      ];
    }
  }

  ngAfterViewChecked() {
    if (!this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // format given date string to GMT
  formatDate(date: string) {
    if (date) {
      date = new Date(date).toUTCString();
      return date.substr(0, 25);
    }
    return date;
  }

  // truncate date string to return yyyy-mm-dd
  truncateDate(date: string) {
    if (date) {
      return date.substr(0, 10);
    }
    return date;
  }

  formatCollection(list: string[]) {
    if (list.length === 1) {
      return list;
    }

    let stringList = '';
    list.forEach((item, index) => {
      if (index === list.length - 1) {
        stringList += item;
      } else {
        stringList += item + ',\n';
      }
    });
    return stringList;
  }
}

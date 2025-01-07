import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import { SilentRequest } from '@azure/msal-browser';
import { AuthenticationResult } from '@azure/msal-common';
import { environment } from 'src/environments/environment';

export interface NotificationMessage {
  type: string;
  title: string;
  message: string;
  timeout: number;
}
export interface NewSearchParams {
  booking_reference: string;
  document_connection: string;
  document_issue_date: string | null;
  ticket_document_number: string;
  document_type: string;
  context: string;
  email_recipient: string;
  email_sender: string;
  email_sent_date: string | null;
  email_subject: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  ticket_issue_date: string | null;
  issuing_date_start: string | null;
  issuing_date_end: string | null;
  flight_number: string;
  airport_code: string;
  first_travel_date_start: string | null;
  first_travel_date_end: string | null;
  city_name: string;
}

export interface SearchParams {
  content: string;
  first_name: string;
  last_name: string;
  name: string;
  ticket_number: string;
  document_number: string;
  document_connection: string;
  booking_reference: string;
  flight: string;
  flight_date: Date | null;
  issuing_date_start: Date | null;
  issuing_date_end: Date | null;
  receipt_sent_date: Date | null;
  departure_city: string;
  arrival_city: string;
  type: string;
  email: string;
  subject: string;
  mailto: string;
  mailfrom: string;
  date: Date | null;
}

export interface ReceiptRequest {
  booking_reference: string | null;
  ticket_number: string | null;
  issuing_date: string | null;
  type: string | null;
}
interface SearchQuery {
  blob_name: String;
  search_queries: ReceiptRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public showLoader = false;
  public showMessage = false;
  public sasString = environment.sas;
  public queryString = environment.query;
  public storage = environment.storage;
  public bulkStorage = environment.bulkStorage;
  public searchData: SearchQuery = {
    blob_name: '',
    search_queries: [],
  };

  public user: any = {};

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    public http: HttpClient,
    private authService: MsalService
  ) {}

  private authRequest: SilentRequest = {
    scopes: ['user.read'],
    account: this.authService.instance.getAllAccounts()[0],
  };

  notify(message: NotificationMessage) {}

  login() {
    this.authService
      .acquireTokenSilent(this.authRequest)
      .subscribe((response: AuthenticationResult) => {
        this.user = response;
        this.authService.instance.setActiveAccount(response.account);
      });
  }

  logout() {
    this.authService.logout();
  }

  getDecodedAccessToken(): any {
    const jwt = new JwtHelperService();
    const token = this.user.accessToken;
    return jwt.decodeToken(token);
  }

  search(search: SearchParams, fields: object, isExact?: boolean) {
    const key = environment.api;
    const link = environment.link;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'api-key': key,
      }),
    };
    let searchCondition = '';
    let filterCondition = '';
    for (const key in search) {
      if (
        key !== 'issuing_date' &&
        (search as any)[key] &&
        key !== 'receipt_sent_date' &&
        key !== 'date' &&
        key !== 'flight_date' &&
        key !== 'issuing_date_start' &&
        key !== 'issuing_date_end'
      ) {
        searchCondition += searchCondition
          ? ` AND ${key}:'${encodeURIComponent((search as any)[key])}'`
          : `${key}:'${encodeURIComponent((search as any)[key])}'`;
        if ((search as any)[key]) {
          filterCondition += filterCondition
            ? ` and ${key} eq '${(search as any)[key]}'`
            : `${key} eq '${(search as any)[key]}'`;
        }
      }
    }
    const body: any = {
      search: searchCondition,
      queryType: 'full',
      select:
        'type,content,receipt_sent_date,date,issuing_date,flight_date,mailto,subject,mailfrom,first_name,last_name,name,flight,departure,arrival,ticket_number,booking_reference,document_number,issuing_date,metadata_storage_name',
      count: true,
      filter: `issuing_date ge ${search.issuing_date_start}T00:00:00Z and issuing_date le ${search.issuing_date_end}T23:59:59Z`,
      top: '100000',
    };

    if (!(search.issuing_date_start && search.issuing_date_end)) {
      delete body.filter;
    }

    if (isExact) {
      delete body.search;
      body.filter = filterCondition;
      if (search.issuing_date_start && search.issuing_date_end) {
        const filterDates = `issuing_date ge ${search.issuing_date_start}T00:00:00Z and issuing_date le ${search.issuing_date_end}T23:59:59Z`;
        body.filter = body.filter
          ? (body.filter += ` and ${filterDates}`)
          : filterDates;
      }
    }
    return this.http.post(`${link}`, body, options);
  }

  // Search bulk-receipt-report index for all files
  getBulkZips() {
    const key = environment.api;
    const link = environment.zipLink;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'api-key': key,
      }),
    };
    return this.http.get(`${link}`, options);
  }

  bulkSearch(blobName: String, searchQueries: ReceiptRequest[]) {
    const link = environment.bulkLink;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + this.user.accessToken,
      }),
    };
    this.searchData = {
      blob_name: blobName,
      search_queries: searchQueries,
    };
    const json = JSON.stringify(this.searchData);
    return this.http.post(`${link}`, json, options);
  }

  newIndexSearch(search: NewSearchParams) {
    const key = environment.api;
    const link = environment.newIndexLink;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'api-key': key,
      }),
    };
    let searchCondition = '';
    // Check each key in the NewSearchParams object. Each key represents a single value entered in the form
    // for collection fields in the index, the value entered is used to search the collection
    for (const key in search) {
      if (key === 'ticket_document_number' && (search as any)[key]) {
        searchCondition += searchCondition
          ? ` AND (document_numbers:"${
              (search as any)[key]
            }" OR ticket_numbers:"${
              (search as any)[key]
            }" OR document_connections:"${(search as any)[key]}")`
          : `(document_numbers:"${(search as any)[key]}" OR ticket_numbers:"${
              (search as any)[key]
            }" OR document_connections:"${(search as any)[key]}")`;
      } else if (
        (key === 'first_name' ||
          key === 'last_name' ||
          key === 'middle_name') &&
        (search as any)[key]
      ) {
        searchCondition += searchCondition
          ? ` AND passenger_names:"${(search as any)[key]}"`
          : `passenger_names:"${(search as any)[key]}"`;
      } else if (key === 'context' && (search as any)[key]) {
        searchCondition += searchCondition
          ? ` AND (pdf_text:"${(search as any)[key]}"`
          : `(pdf_text:"${(search as any)[key]}"`;
        searchCondition += searchCondition
          ? ` OR email_body:"${(search as any)[key]}")`
          : `email_body:"${(search as any)[key]}")`;
      } else if (key === 'airport_code' && (search as any)[key]) {
        searchCondition += searchCondition
          ? ` AND airport_codes:"${(search as any)[key]}"`
          : `airport_codes:"${(search as any)[key]}"`;
      } else if (key === 'flight_number' && (search as any)[key]) {
        searchCondition += searchCondition
          ? ` AND flight_numbers:"${(search as any)[key]}"`
          : `flight_numbers:"${(search as any)[key]}"`;
      } else if (key === 'document_type' && (search as any)[key]) {
        searchCondition += searchCondition
          ? ` AND document_types:"${(search as any)[key]}"`
          : `document_types:"${(search as any)[key]}"`;
      } else if (key === 'city_name' && (search as any)[key]) {
        searchCondition += searchCondition
          ? ` AND city_names:"${(search as any)[key]}"`
          : `city_names:"${(search as any)[key]}"`;
      } else if (
        key !== 'first_travel_date_start' &&
        key !== 'first_travel_date_end' &&
        (search as any)[key] &&
        key !== 'document_issue_date' &&
        key !== 'email_sent_date' &&
        key !== 'issuing_date_start' &&
        key !== 'issuing_date_end'
      ) {
        searchCondition += searchCondition
          ? ` AND ${key}:"${(search as any)[key]}"`
          : `${key}:"${(search as any)[key]}"`;
      }
    }
    // Fields from the index to include in search
    let filterCondition = '';
    // Check if issuing_date_start is filled
    if (search.issuing_date_start) {
      filterCondition += `ticket_issue_date ge ${search.issuing_date_start}T00:00:00Z`;
    }
    // Check if issuing_date_end is filled & filterCondition is empty string
    if (filterCondition && search.issuing_date_end) {
      filterCondition += ` and ticket_issue_date le ${search.issuing_date_end}T23:59:59Z`;
    } else if (search.issuing_date_end) {
      filterCondition += `ticket_issue_date le ${search.issuing_date_end}T23:59:59Z`;
    }
    // Check if first_travel_date_start is filled && filter condition is empty string
    if (filterCondition && search.first_travel_date_start) {
      filterCondition += ` and first_travel_date ge ${search.first_travel_date_start}T00:00:00Z`;
    } else if (search.first_travel_date_start) {
      filterCondition += `first_travel_date ge ${search.first_travel_date_start}T00:00:00Z`;
    }
    // Check if first_travel_date_end is filled && filter condition is empty string
    if (filterCondition && search.first_travel_date_end) {
      filterCondition += ` and first_travel_date le ${search.first_travel_date_end}T23:59:59Z`;
    } else if (search.first_travel_date_end) {
      filterCondition += `first_travel_date le ${search.first_travel_date_end}T23:59:59Z`;
    }
    const selectFields =
      'email_subject, ticket_numbers, ticket_issue_date, ' +
      'passenger_names, email_sender, email_recipient, email_sent_date, email_body, booking_reference, ' +
      'document_numbers, metadata_storage_name, pdf_text, ' +
      'flight_numbers, airport_codes, first_travel_date, city_names, document_types';
    const body: any = {
      search: (searchCondition =
        searchCondition === '' ? '*' : searchCondition),
      searchMode: 'all',
      queryType: 'full',
      select: selectFields,
      count: true,
      filter: filterCondition,
      top: 3000,
    };
    return this.http.post(`${link}`, body, options);
  }
}

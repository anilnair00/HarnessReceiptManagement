import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MsalModule,
  MsalInterceptor,
  MsalGuard,
  MsalRedirectComponent,
  MsalService,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './components/app/app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { UnathorizedComponent } from './components/unathorized/unathorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { BulkSearchComponent } from './components/bulk-search/bulk-search.component';
import { SearchTabComponent } from './components/search-tab/search-tab.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { IndexSearchComponent } from './components/index-search/index-search.component';
import { environment } from 'src/environments/environment';
import { HelpComponent } from './components/help/help.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomPaginator } from './services/custom-paginator.service';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// Display name: ac-app-receiptmanagement-dev

// Application (client) ID: d2d728ce-92c5-4853-955f-9b74089f9f36
// Newer client ID: 60ab4620-e1e6-44be-873b-34c47283bb78

// Directory (tenant) ID:491d83df-1091-40f8-bcf9-b112f9a35fcf

// Object ID: 7fb77a1e-1892-4eaf-a168-e733e7f406e4

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoaderComponent,
    MessageComponent,
    UnathorizedComponent,
    ForbiddenComponent,
    BulkSearchComponent,
    SearchTabComponent,
    TabsComponent,
    SearchFormComponent,
    ResultsTableComponent,
    IndexSearchComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.clientId,
          authority:
            'https://login.microsoftonline.com/491d83df-1091-40f8-bcf9-b112f9a35fcf',
          redirectUri: '/',
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        // MSAL Guard Configuration
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
        // HTTP Interceptors Configuration
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v2.0/me', ['user.read']],
        ]),
      }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
    MsalService,
    MsalBroadcastService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService, NotificationMessage } from '../services/app.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private app: AppService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403 || err.status === 0) {
          if (err.status === 401) {
            const message: NotificationMessage = {
              type: 'error', 
              title: 'Error',
              message: 'Loging failed!',
              timeout: 3000
            }
            this.app.notify(message);
            this.app.logout();
          }

        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

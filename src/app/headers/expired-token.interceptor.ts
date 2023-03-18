import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UserToken} from "../auth/auth.guard";

@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {

  constructor(private userToken:UserToken) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        return throwError(() => {
          switch(error.status){
            case 403:
              this.userToken.removeToken();
              window.location.reload();
              break;
          }
        });
      })
    );
  }
}

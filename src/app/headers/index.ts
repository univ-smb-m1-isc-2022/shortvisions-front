import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./token-bearer.interceptor";
import {ExpiredTokenInterceptor} from "./expired-token.interceptor";


export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ExpiredTokenInterceptor, multi: true}
];

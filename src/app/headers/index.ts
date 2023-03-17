import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./token-bearer.interceptor";


export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

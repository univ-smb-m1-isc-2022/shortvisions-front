import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserToken} from "../auth/auth.guard";
import {environment} from "../../environments/environment";


export const YoutubeAPIKey = environment.YoutubeApiKey;
export const UPLOAD_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private usrToken: UserToken ) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.usrToken.getToken();
    if (!token) return next.handle(request);
    if(request.url!==UPLOAD_URL) {
      const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
      const modifiedReq = request.clone({headers});
      return next.handle(modifiedReq);
    }
    const headers = new HttpHeaders().append('Authorization',`Bearer ${YoutubeAPIKey}`)
    const modifiedReq = request.clone({headers});
    return next.handle(modifiedReq)
  }
}


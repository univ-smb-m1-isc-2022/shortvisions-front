import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {finalize, Observable} from "rxjs";

export const API_ROOT_URL = environment.ShortVision_API;

@Injectable({
  providedIn: 'root',
})
export class SignInUpService {
  registerPostFix = "/v1/auth/register";
  loading = false;

  constructor(private http: HttpClient) {
  }

  registerUser(userData: { firstName: string, lastName: string, password: string, email: string }): Observable<any> {
    this.loading = true;
    const body = { ...userData };
    return this.http.post(API_ROOT_URL + this.registerPostFix, body).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

}


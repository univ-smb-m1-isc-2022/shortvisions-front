import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {finalize, Observable, tap} from "rxjs";
import {User} from "../../models/user";

export const API_ROOT_URL = environment.ShortVision_API;

@Injectable({
  providedIn: 'root',
})
export class SignInUpService {
  registerPostFix = "/v1/auth/register";
  loginPostFix = "/v1/auth/authenticate";
  loading = false;

  currentUser: User | null = null;

  constructor(private http: HttpClient) {
  }

  registerUser(userData: { firstName: string, lastName: string, password: string, email: string }): Observable<any> {
    this.loading = true;
    const body = {...userData};
    return this.http.post(API_ROOT_URL + this.registerPostFix, body).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

  loginUser(userData: { password: string, email: string }): Observable<any> {
    this.loading = true;
    console.log("USRDATA",userData)
    const body = {...userData};
    return this.http.post(API_ROOT_URL + this.loginPostFix, body).pipe(
      tap((response:any)=>{
        localStorage.setItem('token',response.token)
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  isLoading(): boolean {
    return this.loading;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

}


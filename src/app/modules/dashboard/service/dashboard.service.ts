import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {finalize, tap} from "rxjs";


export const API_ROOT_URL = environment.ShortVision_API2;
@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  projectPostfFix = '/users/'
  userData!:Object;
  loading!:boolean;
  constructor(private httpClient: HttpClient) {}
  getDashboardData(id:number) {
    this.userData = {token:localStorage.getItem('token')};
    return this.httpClient.get(API_ROOT_URL + this.projectPostfFix+id).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }
  // createProject();

}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {finalize, tap} from "rxjs";


export type Project = {
  id?: number | null,
  name: string,
  description: string,
}
export const API_ROOT_URL = environment.ShortVision_API2;

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  projectPostfFix = '/users/'
  createProjectSuffix = '/users/projects/projectSection/'
  createProjectPostfix = '/projects/'
  userData!: Object;
  loading!: boolean;

  constructor(private httpClient: HttpClient) {
  }

  getDashboardData(id: number) {
    this.loading = true;
    this.userData = {token: sessionStorage.getItem('token')};
    return this.httpClient.get(API_ROOT_URL + this.projectPostfFix + id).pipe(
      finalize(() => {
        this.loading = false;
      })
    );
  }

  createProject(project: Project, id: number) {
    this.loading = true;
    return this.httpClient.post(
      API_ROOT_URL +
      this.createProjectSuffix +
      id +
      this.createProjectPostfix, project)
      .pipe(
        finalize(() => {
            this.loading = false;
          }
        )
      );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {finalize, map, tap} from "rxjs";
import { BehaviorSubject } from 'rxjs';


export type Project = {
  name: string,
  description: string,
}
export type CompleteProject = {
  id: number;
  name: string;
  description: string;
  mergeVideo: false;
  responseChatGPT: string;
  tts: Tts;
  user: number;
  videos: Video[];
  images: Images[];
  created_date: string;
}
export type Video = {
  id: number;
  name: string;
  path: string;
  urlVideo: string;
  created_date: string;
  projectID: number;
}
export type Images = {
  id: number;
  name: string;
  path: string;
  urlImage: string;
  created_date: string;
  projectID: number;
}
export type Tts = {
  id: number;
  text: string;
  model: string;
  path: string;
  outputFileName: string;
  projectID: number;
}
export const API_ROOT_URL = environment.ShortVision_API;
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  projectPostfFix = '/users/'
  createProjectSuffix = '/user/projectSection/'
  createProjectPostfix = '/projects'

  createVideoSuffix = '/user/videoSection/'
  createVideoPostfix = '/projects/'
  userData!: Object;
  loading$ = new BehaviorSubject<boolean>(false);

  completeProjects!: CompleteProject[];


  constructor(private httpClient: HttpClient) {
  }

  getDashboardData(id: number) {
    this.loading$.next(true);
    this.userData = {token: sessionStorage.getItem('token')};
    return this.httpClient.get(API_ROOT_URL + this.projectPostfFix + id).pipe(
      map((response: any) => {
        const projects = response.projects;
        projects.sort((a: any, b: any) => {
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
        });
        this.completeProjects = projects;
        return {...response, projects};
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    );
  }

  createProject(project: Project, userId: number) {
    this.loading$.next(true)
    return this.httpClient.post(
      API_ROOT_URL +
      this.createProjectSuffix +
      userId +
      this.createProjectPostfix, project)
      .pipe(
        finalize(() => {
            this.loading$.next(false)
          }
        )
      );
  }

  getProjectById(id: number) {
    return this.completeProjects.filter((project: any) => {
      return project.id === id;
    })[0];
  }

  postVideoByName(name: string, userId: number, projectId: number) {
    this.loading$.next(true)
    //api/user/videoSection/:userId/projects/:ProjectId/videos
    return this.httpClient
      .post(API_ROOT_URL +
        this.createVideoSuffix +
        userId +
        this.createVideoPostfix +
        projectId +
        '/videos', {name})
      .pipe(
        finalize(() => {
          this.loading$.next(false)}
        )
      );
  }
}

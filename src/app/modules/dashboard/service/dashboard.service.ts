import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {finalize, map, Observable, tap} from "rxjs";
import {BehaviorSubject} from 'rxjs';
import {Router} from "@angular/router";


export type Project = {
  name: string,
  description: string,
}
export type CompleteProject = {
  id: number;
  name: string;
  description: string;
  mergeVideo: boolean;
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
  readonly loading$ = new BehaviorSubject<boolean>(false);

  completeProjects$ = new BehaviorSubject<CompleteProject[]>([]);

  readonly currentProject$ = new BehaviorSubject<CompleteProject | undefined>(undefined);

  constructor(private httpClient: HttpClient, private router:Router) {
  }

  getDashboardData(id: number) {
    this.loading$.next(true);
    return this.httpClient.get(API_ROOT_URL + this.projectPostfFix + id).pipe(
      map((response: any) => {
        const projects = response.projects;
        projects.sort((a: any, b: any) => {
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
        });
        this.completeProjects$.next(projects); // mise à jour du BehaviorSubject
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

  getProjectById(id: number): CompleteProject | undefined {
    const project = this.completeProjects$.value.find(p => p.id === id);
    console.log('id', id)
    console.log('project', project)
    if (project) {
      this.currentProject$.next(project);
    }
    return project;
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
            this.currentProject$.next(this.currentProject$.value);
            this.loading$.next(false)
          }
        )
      );
  }

  getCurrentProject(userId: number, projectId: number) {
    //   http://localhost:8080/api/user/projectSection/:userid/projects/:projectid
    return this.httpClient.get(API_ROOT_URL +
      this.createProjectSuffix +
      userId +
      this.createProjectPostfix +
      '/' +
      projectId)
      .pipe(
        tap((response: any) => {
            this.currentProject$.next(response);
          }
        )
      );
  }

  deleteVideo(userId: number, projectId: number, videoId: number) {
    //http://localhost:8080/api/user/videoSection/:userID/projects/:projectId/video/:VideoId
    return this.httpClient.delete(API_ROOT_URL +
      this.createVideoSuffix +
      userId +
      this.createVideoPostfix +
      projectId +
      '/video/' +
      videoId)
      .pipe(
        tap((response: any) => {
            this.currentProject$.next(this.currentProject$.value);
          }
        )
      );
  }

  generateText(userId: number, projectId: number, text: string) {
    //@TODO REMOVE ROLE
    this.loading$.next(true)
    // http://localhost:8080/api/user/chatGPTSection/:userId/projects/:projectId/chatGPT
    return this.httpClient.post(API_ROOT_URL +
      '/user/chatGPTSection/' +
      userId +
      '/projects/' +
      projectId +
      '/chatGPT', {"content": text, "role": "user"})
      .pipe(
        tap((response: any) => {
            this.currentProject$.next(this.currentProject$.value);
          },
        ),
        finalize(() => {
            this.loading$.next(false)
          }
        )
      );
  }

  generateTTS(userId: number, projectId: number, text: string) {
    // http://localhost:8080/api/user/ttsSection/1/projects/1/tts
    this.loading$.next(true)
    return this.httpClient.post(API_ROOT_URL +
      '/user/ttsSection/' +
      userId +
      '/projects/' +
      projectId +
      '/tts',
      {
        "model": 'tts_models/en/ljspeech/vits',
        "outputFileName": "output_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + ".wav",
      })
      .pipe(
        tap((response: any) => {
            this.currentProject$.next(this.currentProject$.value);
          }
        ),
        finalize(() => {
            this.loading$.next(false)
          }
        )
      );
  }

  mergeVideo(userId: number, projectId: number) {
    //   http://localhost:8080/api/user/mergeSection/1/projects/1/videos/merge
    this.loading$.next(true)
    return this.httpClient.post(API_ROOT_URL +
      '/user/mergeSection/' +
      userId +
      '/projects/' +
      projectId +
      '/videos/merge', {})
      .pipe(
        tap((response: any) => {
            this.currentProject$.next(this.currentProject$.value);
          }
        ),
        finalize(() => {
            this.loading$.next(false)
          }
        )
      );
  }

  getVideo(userId: number, projectId: number): Observable<string> {
    // const url = `http://localhost:8080/api/user/mergeSection/${userId}/projects/${projectId}/videos/merge`;
    const url = API_ROOT_URL + '/user/mergeSection/' + userId + '/projects/' + projectId + '/videos/merge';
    this.loading$.next(true);
    return this.httpClient.get(url)
      .pipe(
        map((response: any) => response.encodedVideo),
        finalize(() => {
          this.loading$.next(false)
        })
      );
  }
  getProjectByUrl() {
    return +this.router.url.split('/')[3]
  }
}





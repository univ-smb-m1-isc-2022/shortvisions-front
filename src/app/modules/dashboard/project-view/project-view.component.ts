import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "./modal.service";
import {CompleteProject, DashboardService, Video} from "../service/dashboard.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../globalService/user.service";
import {Subscription} from "rxjs";


export type Step = {
  index: number;
  current: string;
}

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy, AfterContentChecked {


  steps = [
    'Video',
    'Text',
    'Merge',
  ]
  currentStep!: Step;
  videoForm!: FormGroup;
  textForm!: FormGroup;
  ttsForm!: FormGroup;
  isProcessStarted!: boolean;

  //Observables
  isAppLoadingSub!: Subscription;
  isAppLoading!: boolean;
  currentProject!: CompleteProject | undefined;
  currentProjectSub!: Subscription;


  lastAsideClicked: any = null;

  constructor(private userService: UserService,
              private dashboardService: DashboardService,
              private router: Router,
              private modalService: ModalService) {
  }

  ngAfterContentChecked(): void {
    // this.videoElement?.changes.subscribe((videoElement: QueryList<ElementRef>) => {
    //   console.log('videoElement', videoElement['_results']);
    //   videoElement['_results'].forEach((video: ElementRef) => {
    //     video.nativeElement.addEventListener('click', () => {
    //       console.log('video', video.nativeElement);
    //
    //     });
    //   });
    // })
  }

  ngOnDestroy(): void {
    this.isAppLoadingSub.unsubscribe();
    this.currentProjectSub.unsubscribe();
  }

  ngOnInit(): void {
    this.currentStep = {
      index: 0,
      current: this.steps[0]
    };
    this.isAppLoadingSub = this.dashboardService.loading$.subscribe(
      (isLoading: boolean) => {
        this.isAppLoading = isLoading;
      }
    )
    this.videoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
    this.textForm = new FormGroup({
      content: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
    this.ttsForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
    this.isProcessStarted = false;
    this.currentProjectSub = this.dashboardService.currentProject$.subscribe(
      (project: CompleteProject | undefined) => {
        this.currentProject = project;
      }
    );
    // this.currentProject = this.dashboardService.getProjectById(this.getProjectByUrl());
    this.dashboardService.getCurrentProject(this.userService.getUser().id as number, this.getProjectByUrl())
      .subscribe((project: CompleteProject) => {
          console.log('currentProject', this.currentProject);
        }
      );
  }

  onBackArrowClick() {
    this.router.navigate(['/dashboard']).then();
  }

  startProcess() {
    this.isProcessStarted = true;
  }

  onSubmitVideo() {
    if (this.videoForm.invalid) {
      return;
    }
    this.isAppLoading = true;
    this.dashboardService.postVideoByName(
      this.videoForm.value.name,
      this.userService.getUser().id as number,
      this.getProjectByUrl()
    ).subscribe((response: any) => {
        console.log('respFromComponent', response);
        this.currentProject?.videos.push(response);
      }
    );
  }

  getProjectByUrl() {
    return +this.router.url.split('/')[3]
  }

  toggleFullscreen(videoElement: any) {
    console.log('videoElement', videoElement)
    console.log('Click!')
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  }

  resetVideo(target: EventTarget | null) {
    console.log('Im reseting the aside', target);
    const currentTarget = target as HTMLElement
    if (this.lastAsideClicked) {
      if (target && (target as HTMLElement).tagName === 'SPAN') {
        if (this.lastAsideClicked != currentTarget.closest('aside')) {
          this.resetAside(this.lastAsideClicked);
          this.transformAside(target as HTMLElement);
        }
      } else {
        this.resetAside(this.lastAsideClicked);
      }
    }
  }

  transformAside(target: HTMLElement) {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const translateX = centerX - rect.left - rect.width / 2;
    const translateY = centerY - rect.top - rect.height / 2;
    target.style.transform = `scale(4) translate(${translateX}px, ${translateY}px)`;
    target.style.transition = 'transform 0.5s ease-in-out';
    target.style.zIndex = '100';
    target.style.left = 'calc(50% - ' + target.offsetWidth / 2 + 'px)';
    target.style.top = 'calc(50% - ' + target.offsetHeight / 2 + 'px)';
    target.style.position = 'absolute';
    this.lastAsideClicked = target;
  }

  private resetAside(target: HTMLElement) {
    target.style.cssText = 'background: var(--primary-inverse);' +
      ' display: flex; flex-direction: column;' +
      ' justify-content: space-between;' +
      ' width: calc(var(--font-size) * 8);' +
      ' height: calc(var(--font-size) * 6);' +
      ' transition: all 0.2s ease-in-out;' +
      ' border: 0.2px groove var(--color);' +
      ' border-radius: 5px;' +
      ' box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);'
  }

  toggleAnimate(event: Event | null) {
    const target = (event?.currentTarget as HTMLElement).closest('aside');
    if (target && target.tagName === 'ASIDE') {
      console.log('I am an Aside!')
      const asideElement = target;
      const rect = asideElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const translateX = centerX - rect.left - rect.width / 2;
      const translateY = centerY - rect.top - rect.height / 2;
      if (this.lastAsideClicked !== asideElement) {
        console.log('RESET!')
        this.resetVideo(asideElement);
      }
      asideElement.style.transform = `scale(4) translate(${translateX}px, ${translateY}px)`;
      asideElement.style.transition = 'transform 0.5s ease-in-out';
      asideElement.style.zIndex = '100';
      asideElement.style.left = 'calc(50% - ' + asideElement.offsetWidth / 2 + 'px)';
      asideElement.style.top = 'calc(50% - ' + asideElement.offsetHeight / 2 + 'px)';
      asideElement.style.position = 'absolute';
      this.lastAsideClicked = asideElement;
      console.log('asideElement', asideElement)
      console.log('this.lastAsideClicked', this.lastAsideClicked)
    }
  }


  deleteVideo(videoId: number) {
    if (confirm('Are you sure you want to delete this video?')) {
      this.dashboardService.deleteVideo(
        this.userService.getUser().id as number,
        this.getProjectByUrl(),
        videoId
      ).subscribe((response: any) => {
          if (this.currentProject) {
            this.currentProject.videos = this.currentProject.videos.filter((video: Video) => video.id !== videoId);
          }
        }
      );
    }
  }

  nextStep() {
    this.currentStep.index++;
    this.currentStep.current = this.steps[this.currentStep.index];
  }

  aiGeneratedText() {
    if (this.textForm.invalid) {
      return;
    }
    this.isAppLoading = true;
    this.dashboardService.generateText(
      this.userService.getUser().id as number,
      this.getProjectByUrl(),
      this.textForm.value.content
    ).subscribe(
      (response: any) => {
        console.log('respFromComponent', response);
        if (this.currentProject) this.currentProject.responseChatGPT = response.response;
      }
    )
  }

  generateVoiceOver() {
    this.dashboardService.generateTTS(
      this.userService.getUser().id as number,
      this.getProjectByUrl(),
      this.currentProject?.responseChatGPT as string
    ).subscribe(
      (response: any) => {
        console.log('respFromComponent', response);
        if (this.currentProject) this.currentProject.tts = response;

      }
    )
  }

  mergeVideo() {
    this.dashboardService.mergeVideo(
      this.userService.getUser().id as number,
      this.getProjectByUrl(),
    ).subscribe(
      (response: any) => {
        console.log('respFromComponent', response);
        if (this.currentProject) this.currentProject.mergeVideo = true;
      }
    );
  }

}

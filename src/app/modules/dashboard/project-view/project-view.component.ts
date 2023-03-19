import {Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "./modal.service";
import {CompleteProject, DashboardService} from "../service/dashboard.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../globalService/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {

  @ViewChild('png') png: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('mp4') mp4: ElementRef<HTMLVideoElement> | undefined;
  @ViewChild('wav') wav: ElementRef<HTMLAudioElement> | undefined;
  @ViewChild('txt') txt: ElementRef<HTMLAudioElement> | undefined;
  @ViewChild('dialogTxt') dialogTxt: ElementRef<HTMLDialogElement> | undefined;
  @ViewChild('dialogPng') dialogPng: ElementRef<HTMLDialogElement> | undefined;
  @ViewChild('dialogMp4') dialogMp4: ElementRef<HTMLDialogElement> | undefined;
  @ViewChild('dialogWav') dialogWav: ElementRef<HTMLDialogElement> | undefined;

  videoForm!: FormGroup;
  isProcessStarted!: boolean;

  //Observables
  isVideoLoadingSub!: Subscription;
  isVideoLoading!: boolean;
  currentProject!: CompleteProject | undefined;
  currentProjectSub!: Subscription;

  constructor(private userService: UserService,
              private dashboardService: DashboardService,
              private router: Router,
              private modalService: ModalService) {
  }


  ngOnDestroy(): void {
    this.isVideoLoadingSub.unsubscribe();
    this.currentProjectSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isVideoLoadingSub = this.dashboardService.loading$.subscribe(
      (isLoading: boolean) => {
        this.isVideoLoading = isLoading;
      }
    )
    this.videoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
    this.isProcessStarted = false;
    this.currentProjectSub = this.dashboardService.currentProject$.subscribe(
      (project: CompleteProject | undefined) => {
        this.currentProject = project;
      }
    );
    // this.currentProject = this.dashboardService.getProjectById(this.getProjectByUrl());
    this.dashboardService.getCurrentProject(
      this.userService.getUser().id as number,
      this.getProjectByUrl()
    ).subscribe(
      (project: CompleteProject) => {
        console.log('currentProject', this.currentProject);
      }
    )
    ;

  }

  onBackArrowClick() {
    this.router.navigate(['/dashboard']).then();
  }

  openModal(fileType: string): void {
    switch (fileType) {
      case 'mp4':
        console.log('mp4', this.mp4);
        this.dialogMp4?.nativeElement.setAttribute('open', 'true');
        break;
      case 'png':
        console.log('png', this.png);
        this.dialogPng?.nativeElement.setAttribute('open', 'true');
        break;
      case 'wav':
        console.log('wav', this.wav);
        this.dialogWav?.nativeElement.setAttribute('open', 'true');
        break;
      case 'txt':
        this.dialogTxt?.nativeElement.setAttribute('open', 'true');
        break;
      default:
        break;
    }
  }

  closeModal(fileType: string): void {
    switch (fileType) {
      case 'mp4':
        console.log('mp4', this.mp4);
        this.dialogMp4?.nativeElement.removeAttribute('open');
        break;
      case 'png':
        console.log('png', this.png);
        this.dialogPng?.nativeElement.removeAttribute('open');
        break;
      case 'wav':
        console.log('wav', this.wav);
        this.dialogWav?.nativeElement.removeAttribute('open');
        break;
      case 'txt':
        console.log('txt', this.txt);
        this.dialogTxt?.nativeElement.removeAttribute('open');
        break;
      default:
        break;
    }
  }

  startProcess() {
    this.isProcessStarted = true;
  }

  onSubmitVideo() {
    if (this.videoForm.invalid) {
      return;
    }
    this.isVideoLoading = true;
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
}

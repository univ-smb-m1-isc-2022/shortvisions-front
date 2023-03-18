import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "./modal.service";
import {CompleteProject, DashboardService} from "../service/dashboard.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  @ViewChild('png') png: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('mp4') mp4: ElementRef<HTMLVideoElement> | undefined;
  @ViewChild('wav') wav: ElementRef<HTMLAudioElement> | undefined;
  @ViewChild('txt') txt: ElementRef<HTMLAudioElement> | undefined;
  @ViewChild('dialogTxt') dialogTxt: ElementRef<HTMLDialogElement> | undefined;
  @ViewChild('dialogPng') dialogPng: ElementRef<HTMLDialogElement> | undefined;
  @ViewChild('dialogMp4') dialogMp4: ElementRef<HTMLDialogElement> | undefined;
  @ViewChild('dialogWav') dialogWav: ElementRef<HTMLDialogElement> | undefined;

  currentProject!: CompleteProject;
  constructor(private dashboardService:DashboardService,
              private router: Router,
              private modalService: ModalService) {}
  ngOnInit(): void {
    this.currentProject = this.dashboardService.getProjectById(+this.router.url.split('/')[3]);
    console.log('ProjectView',this.currentProject);
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


}

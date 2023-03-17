import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit{
  @ViewChild('png') png: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('mp4') mp4: ElementRef<HTMLVideoElement> | undefined;
  @ViewChild('wav') wav: ElementRef<HTMLAudioElement> | undefined;
  @ViewChild('txt') mp3: ElementRef<HTMLAudioElement> | undefined;

  constructor() {}
  ngOnInit(): void {}
}

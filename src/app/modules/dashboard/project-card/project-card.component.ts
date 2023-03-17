import {Component, Input, OnInit} from '@angular/core';

export type CompleteProject = {
  id: number;
  mergeVideo: false;
  responseChatGPT: string;
  tts: string[];
  user: number;
  videos: string[];
  images: string[];
  created_date: string;
}
@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit{

  @Input() project!: CompleteProject;
  constructor() {
  }

  ngOnInit(): void {
  }
}

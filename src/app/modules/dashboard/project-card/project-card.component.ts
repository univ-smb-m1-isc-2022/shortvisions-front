import {Component, Input, OnInit} from '@angular/core';
import {CompleteProject} from "../service/dashboard.service";


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
    console.log('ProjectCardComponent.ngOnInit()', this.project);
  }
}

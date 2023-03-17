import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../service/dashboard.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{
  createProjectForm!: FormGroup;
  constructor(private dashboardService: DashboardService) {
  }
  ngOnInit(): void {
    this.createProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }
  onCreateProject(){

  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../service/dashboard.service";
import {UserService} from "../../../globalService/user.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  createProjectForm!: FormGroup;

  constructor(private router: Router, private userService: UserService, private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.createProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(255)])
    })
  }

  onCreateProject() {
    this.dashboardService.createProject(this.createProjectForm.value, this.userService.getUser().id as number).subscribe({
      next: (data: any) => {
        console.log('CreateProjectComponent.onCreateProject().next()', data);
        if (data.id) {
          this.router.navigate(['/dashboard/']).then();
        }
      },
      error: (error) => {
        console.log('CreateProjectComponent.onCreateProject().error()', error);
      },
      complete: () => {
        console.log('CreateProjectComponent.onCreateProject().complete()');
      }
    })
  }
}

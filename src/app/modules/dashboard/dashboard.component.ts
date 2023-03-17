import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName!: string;
  userId!: number;
  projects!: Object[];
  constructor(private dashBoardService: DashboardService, private router: Router) {}
  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('user'));
    this.dashBoardService.getDashboardData(this.userId).subscribe(
      {
        next: (response:any) => {
          console.log('RESPONSE FROM DASHBOARD COMPONENT', response);
          this.projects = response.projects;
          this.userName = response.username;
          console.log('PROJECTS', this.projects);
        },
        error: (error:any) => {
          console.log('ERROR FROM DASHBOARD COMPONENT', error);
        },
        complete: () => {
        }
      }
    );
  }onCreateProject() {
    this.router.navigate(['/dashboard/create-project']).then();
  }
}

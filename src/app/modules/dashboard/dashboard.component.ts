import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';
import {CompleteProject, DashboardService} from "./service/dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  userName!: string;
  userId!: number;
  projects!: CompleteProject[];

  constructor(private dashBoardService: DashboardService, private router: Router) {
  }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('user'));
    this.dashBoardService.getDashboardData(this.userId).subscribe(
      {
        next: (response: any) => {
          this.projects = response.projects;
          this.userName = response.username;
          console.log('PROJECTS', this.projects);
        },
        error: (error: any) => {
          console.log('ERROR FROM DASHBOARD COMPONENT', error);
        },
        complete: () => {
        }
      }
    );
  }
  onCreateProject() {
    this.router.navigate(['/dashboard/create-project']).then();
  }
  onViewProject(id: number) {
    console.log('VIEW PROJECT', id);
    this.router.navigate(['/dashboard/project', id]).then();
  }
  ngAfterContentChecked(): void {
    const grid = document.querySelector('.project--body--grid') as HTMLElement;
    const items = grid.children;
    if (items.length > 0) {
      const itemsPerRow = Math.floor(grid.offsetWidth / (items[0] as HTMLElement).offsetWidth);
      const lastRowItemCount = items.length % itemsPerRow;
      if (lastRowItemCount > 0) {
        const lastRowItems = Array.from(items).slice(-lastRowItemCount);
        (lastRowItems[lastRowItemCount - 1] as HTMLElement).style.gridColumnEnd = `span ${itemsPerRow - lastRowItemCount + 1}`;
      }
    }
  }
}


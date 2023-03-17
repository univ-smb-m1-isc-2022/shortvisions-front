import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {Router} from "@angular/router";
import {CompleteProject} from "./project-card/project-card.component";

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
          console.log('RESPONSE FROM DASHBOARD COMPONENT', response);
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

  ngAfterContentChecked(): void {
    const grid = document.querySelector('.project--body--grid') as HTMLElement;

    const items = grid.children;


    if (items.length > 0) {
      const itemsPerRow = Math.floor(grid.offsetWidth / (items[0] as HTMLElement).offsetWidth);
      console.log('ITEMS PER ROW', itemsPerRow);
      const lastRowItemCount = items.length % itemsPerRow;
      console.log('LAST ROW ITEM COUNT', lastRowItemCount);
      if(lastRowItemCount > 0) {
        const lastRowItems = Array.from(items).slice(-lastRowItemCount);
        (lastRowItems[lastRowItemCount - 1] as HTMLElement).style.gridColumnEnd = `span ${itemsPerRow - lastRowItemCount + 1}`;

      }
    }
  }
}


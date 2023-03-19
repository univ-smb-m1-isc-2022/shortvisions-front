import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from "../../service/dashboard.service";
import {UserService} from "../../../../globalService/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-final-video',
  templateUrl: './final-video.component.html',
  styleUrls: ['./final-video.component.scss']
})
export class FinalVideoComponent {

  video!:string;
  constructor(private router:Router,private dashboardService: DashboardService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.dashboardService.getVideo(1, 1).subscribe(url => {
      this.video = url;
    });

  }
  getProjectByUrl() {
    return +this.router.url.split('/')[3]
  }
}


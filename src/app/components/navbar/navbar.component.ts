import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUrl!: string|undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  async onIconClick() {
    console.log("icon clicked")
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      await this.router.navigate(['/dashboard'])
    } else {
      await this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.currentUrl=this.router.url;
    console.log(this.currentUrl)
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserToken} from "../../auth/auth.guard";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUrl!: string | undefined;
  isUserLoggedIn!: boolean;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userToken: UserToken) {
  }


  async onIconClick() {
    console.log("icon clicked")
    console.log(sessionStorage.getItem('token'))
    if (sessionStorage.getItem('token')) {
      await this.router.navigate(['/dashboard'])
    } else {
      await this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.isUserLoggedIn = !!this.userToken.getToken()
      }
    });
    this.currentUrl = this.router.url;
  }
  onLogOut() {
    this.userToken.removeToken();
  }
}

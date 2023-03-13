import { Component } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router:Router) { }

  async onIconClick(){
    console.log("icon clicked")
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')){
      await this.router.navigate(['/dashboard'])
    }else{
      await this.router.navigate(['/'])
    }
  }
}

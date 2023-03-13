import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {User} from "../../models/user";
import {SignInUpService} from "../../services/signInUp/sign-in-up.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userData!: {
    email: string,
    password: string,
  };
  loading = false;
  constructor(private signInUpService:SignInUpService,private router:Router) { }

  ngOnInit(): void {
    this.userData = {
      email: '',
      password: '',
    }
  }
  onSubmit() {
    this.loading = this.signInUpService.isLoading();
    this.signInUpService.loginUser(this.userData).subscribe({
      next: async (data) => {
        // console.log('RegisterComponent.onSubmit().next()', data);
        const user = {
          email: this.userData.email,
          token: data
        } as User;
        this.signInUpService.setCurrentUser(user);
        this.loading = this.signInUpService.isLoading();
        await this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('RegisterComponent.onSubmit().error()', error);
        this.loading = this.signInUpService.isLoading();
      }
    });
  }
}

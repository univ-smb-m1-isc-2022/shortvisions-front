import {Component, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {User} from "../../../models/user";
import {SignInUpService} from "../service/sign-in-up.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  isError = false;
  loginForm!: FormGroup;
  loading = false;
  constructor(private signInUpService:SignInUpService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

  }
  onSubmit() {
    this.loading = this.signInUpService.isLoading();
    this.signInUpService.loginUser(this.loginForm.value).subscribe({
      next: async (data) => {
        // console.log('RegisterComponent.onSubmit().next()', data);
        const user = {
          email: this.loginForm.value.email,
          token: data
        } as User;
        this.signInUpService.setCurrentUser(user);
        this.loading = this.signInUpService.isLoading();
        await this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('RegisterComponent.onSubmit().error()', error);
        this.isError = true;
        this.loading = this.signInUpService.isLoading();
      }
    });
  }
}

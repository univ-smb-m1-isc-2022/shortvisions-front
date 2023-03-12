import {Component, OnInit} from '@angular/core';
import {SignInUpService} from "../../services/signInUp/sign-in-up.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData!: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
  };

  loading = false;
  constructor(private signInUpService: SignInUpService, private router: Router) {
  }

  ngOnInit(): void {
    this.userData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  submitButton() {
    console.log('RegisterComponent.submitButton()', this);
    this.signInUpService.registerUser(this.userData);
  }

  onSubmit() {
    this.loading = this.signInUpService.isLoading();
    this.signInUpService.registerUser(this.userData).pipe(
      finalize(() => {
        this.signInUpService.loading = false;
      })
    ).subscribe({
      next: async (data) => {
        console.log('RegisterComponent.onSubmit().next()', data);
        const user = {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
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

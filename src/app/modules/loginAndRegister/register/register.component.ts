import {Component, OnInit} from '@angular/core';
import {SignInUpService} from "../service/sign-in-up.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import {User} from "../../../models/user";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";


export const notSame = {notSame: true};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder ,private signInUpService: SignInUpService, private router: Router) {
  }

  ngOnInit(): void {
    // this.userData={
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    // }
    this.registerForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    },{validator: this.checkPasswords})
  }

  checkPasswords(control:AbstractControl){
    const pass = control.get('password')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    return pass === confirmPass ? null : {notSame:true}
  }
  onSubmit() {
    this.loading = this.signInUpService.isLoading();
    this.signInUpService.registerUser(this.registerForm.value)
      .pipe(
      finalize(() => {
        this.signInUpService.loading = false;
      })
    ).subscribe({
      next: async (data) => {
        const user = {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
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

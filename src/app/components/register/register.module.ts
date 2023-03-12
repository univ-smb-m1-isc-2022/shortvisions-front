import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AppModule} from "../../app.module";
import {TerminalCardComponent} from "../terminal-card/terminal-card.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SignInUpService} from "../../services/signInUp/sign-in-up.service";

const routes: Routes = [
  {path: '', component: RegisterComponent},
  // {path:'app', loadChildren: () => import('../app.module').then(m => m.AppModule)},
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    RegisterComponent,
    TerminalCardComponent,
    // ButtonComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers:[
    SignInUpService
  ]
})
export class RegisterModule {
}

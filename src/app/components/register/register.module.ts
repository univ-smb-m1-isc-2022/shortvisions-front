import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

const routes: Routes = [
  {path: '', component: RegisterComponent}
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    RegisterComponent,
    // ButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class RegisterModule {
}

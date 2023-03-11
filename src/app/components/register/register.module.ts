import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AppModule} from "../../app.module";
import {TerminalCardComponent} from "../terminal-card/terminal-card.component";

const routes: Routes = [
  {path: '', component: RegisterComponent}
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    RegisterComponent,
    TerminalCardComponent,
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

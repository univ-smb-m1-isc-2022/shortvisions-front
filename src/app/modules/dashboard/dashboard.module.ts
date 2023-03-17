import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {TerminalCardComponent} from "../terminal-card/terminal-card.component";
import { ProjectCardComponent } from './project-card/project-card.component';
import {DashboardService} from "./service/dashboard.service";
import {HttpClientModule} from "@angular/common/http";
import { CreateProjectComponent } from './create-project/create-project.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path:'create-project', component: CreateProjectComponent}
]

@NgModule({
  declarations: [
    DashboardComponent,
    TerminalCardComponent,
    ProjectCardComponent,
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DashboardService,
  ],
})
export class DashboardModule { }

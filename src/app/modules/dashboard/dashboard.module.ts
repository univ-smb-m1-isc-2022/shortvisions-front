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
import {TruncateProjectDescrPipe} from "../../pipes/truncate-project-descr.pipe";
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path:'create-project', component: CreateProjectComponent},
  {path: 'project/:id', component: ProjectViewComponent}
]

@NgModule({
  declarations: [
    DashboardComponent,
    TerminalCardComponent,
    ProjectCardComponent,
    CreateProjectComponent,
    TruncateProjectDescrPipe,
    ProjectViewComponent
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

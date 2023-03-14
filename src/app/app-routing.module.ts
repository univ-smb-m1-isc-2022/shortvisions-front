import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroSectionComponent} from "./modules/hero-section/hero-section.component";
import {canActivateTeam, cannotActivateTeam} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: HeroSectionComponent},
  {path: 'register', loadChildren: () => import('./modules/loginAndRegister/register/register.module').then(m => m.RegisterModule), canActivate: [cannotActivateTeam]},
  {path: 'login', loadChildren: () => import('./modules/loginAndRegister/login/login.module').then(m => m.LoginModule), canActivate: [cannotActivateTeam]},
  {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [canActivateTeam]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

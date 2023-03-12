import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroSectionComponent} from "./components/hero-section/hero-section.component";

const routes: Routes = [
  {path: '', component: HeroSectionComponent},
  {path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)},
  {path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
  {path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

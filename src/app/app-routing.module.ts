import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroSectionComponent} from "./components/hero-section/hero-section.component";

const routes: Routes = [
  {path: '', component: HeroSectionComponent},
  {path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

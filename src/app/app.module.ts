import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalCardComponent } from './modules/terminal-card/terminal-card.component';
import { HeroSectionComponent } from './modules/hero-section/hero-section.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import {ContentCardComponent} from "./modules/hero-section/content-card-container/content-card/content-card.component";
import {
  ContentCardContainerComponent
} from "./modules/hero-section/content-card-container/content-card-container.component";
import {PermissionsService, UserToken} from "./auth/auth.guard";
import { TruncatePipe } from './pipes/truncate.pipe';
import {HttpInterceptorProviders} from "./headers";
import { TruncateProjectDescrPipe } from './pipes/truncate-project-descr.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // TerminalCardComponent,
    HeroSectionComponent,
    NavbarComponent,
    ContentCardComponent,
    ContentCardContainerComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PermissionsService,
    UserToken,
    HttpInterceptorProviders
  ],
    exports: [
        NavbarComponent,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

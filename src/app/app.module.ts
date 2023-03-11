import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalCardComponent } from './components/terminal-card/terminal-card.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ContentCardComponent} from "./components/hero-section/content-card-container/content-card/content-card.component";
import {
  ContentCardContainerComponent
} from "./components/hero-section/content-card-container/content-card-container.component";

@NgModule({
  declarations: [
    AppComponent,
    TerminalCardComponent,
    HeroSectionComponent,
    NavbarComponent,
    ContentCardComponent,
    ContentCardContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

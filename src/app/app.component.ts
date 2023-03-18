import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {fader} from "./animations/routeAnimations";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader]
})
export class AppComponent {
  title = 'shortVisions-front';
  outlet: RouterOutlet | undefined;
  prepareRoute(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

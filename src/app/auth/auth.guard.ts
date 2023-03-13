import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";


@Injectable()
 export class UserToken {
  constructor() {
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
@Injectable()
 export class PermissionsService {
  canActivate(currentUser: UserToken): boolean {
    const token = currentUser.getToken();
    return !!token;
  }
}

export const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canActivate(inject(UserToken));
  };

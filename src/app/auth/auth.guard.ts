import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";


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
  constructor(private router: Router) {}
  canActivate(currentUser: UserToken): boolean {
    const token = currentUser.getToken();
    if(!token){
      this.router.navigate(['/']).then();
    }
    return !!token;
  }
}

export const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canActivate(inject(UserToken));
  };

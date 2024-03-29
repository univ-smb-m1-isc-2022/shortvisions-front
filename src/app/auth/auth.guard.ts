import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";


@Injectable()
export class UserToken {
  constructor() {
  }
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  removeToken(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
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
  canActivateLoginOrRegister(currentUser: UserToken): boolean {
    const token = currentUser.getToken();
    if(token){
      this.router.navigate(['/dashboard']).then();
    }
    return !token;
  }
}

export const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canActivate(inject(UserToken));
  };

export const cannotActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(PermissionsService).canActivateLoginOrRegister(inject(UserToken));
  }

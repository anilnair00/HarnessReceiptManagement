import { Injectable } from '@angular/core';
import { AppService } from '../services/app.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private app: AppService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (this.app.currentUser) {
    //   return true;
    // }

    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
    return true;
  }
}

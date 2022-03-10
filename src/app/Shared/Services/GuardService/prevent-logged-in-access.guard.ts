import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoggedInAccessGuard implements CanActivate {


  constructor(private authService: AuthService, private _router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = this.authService.isUserLoggedIn?.value;

    if (isLoggedIn && this.authService.type.value != null) {
      this._router.navigate(['/consulting']);

    }
    return !isLoggedIn;

  }

}

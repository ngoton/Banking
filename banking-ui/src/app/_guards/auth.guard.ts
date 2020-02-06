import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      debugger;
      const url: string  = location.origin + state.url;
      if (localStorage.getItem('token')) {
        return true;
      }
      this.router.navigate(['onboarding/login'], { queryParams: { returnUrl: url }});
      return false;
  }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { takeUntil, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const url: string  = location.origin + state.url;
      let token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        let userInfor = JSON.parse(localStorage.getItem('userDetails'));
        
        switch(userInfor.role){
          case 'ADMIN':
            state.url.includes("/employee") ? null : this.router.navigate(['/employee', {role: 'ADMIN'}]);
            break;
          case 'STAFF':
            state.url.includes("/employee") ? null : this.router.navigate(['/employee', {role: 'STAFF'}]);
            break;
          case 'USER':
            state.url.includes("/customer") ? null : this.router.navigate(['/customer']);
            break;
        }

        return true;
      }
      this.router.navigate(['onboarding/login'], { queryParams: { returnUrl: url }});
      return false;
  }
}

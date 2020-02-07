import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { UtilitiesService } from './utilities.service';
import { User } from '../_models/user';
import { UserService } from './user.service';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  public AUTH_URL = environment.BASE_URL + environment.AUTH_SERV;

  constructor(
    private http: HttpClient,
    public util: UtilitiesService) { }

    login(credentials): Observable<any> {
      console.log(credentials);
      const loginData = {
        username: credentials.Username,
        password: credentials.Password,
      };
      const PATH = this.AUTH_URL + `/authenticate`;
      return this.http.post<any>(PATH, JSON.stringify(loginData))
      .pipe(
        retry(3),
        catchError(this.util.handleError)
      );
    }

    logout() {
      // remove user from local storage to log user out
        this.clearLocalStorage();
    }

    requestPassword(email): Observable<any>{
      const PATH = this.AUTH_URL + `/forgot`;
      return this.http.post<any>(PATH, JSON.stringify({email: email}))
      .pipe(
        retry(3),
        catchError(this.util.handleError)
      );
    }

    getToken(): string {
      return JSON.parse(localStorage.getItem('token'));
    }

    ibankLogout() {
      this.logout();
    }

    clearLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      localStorage.clear();
    }

    ngOnDestroy(): void {}
}

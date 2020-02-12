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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  public AUTH_URL = environment.BASE_URL + environment.AUTH_SERV;

  constructor(
    private http: HttpClient,
    public util: UtilitiesService,
    private router: Router) { }

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
        //catchError(this.util.handleError)
      );
    }

    logout() {
      // remove user from local storage to log user out
        this.clearLocalStorage();
        this.router.navigate(['onboarding/login']);
    }

    requestPassword(email): Observable<any>{
      const PATH = this.AUTH_URL + `/forgot`;
      return this.http.post<any>(PATH, JSON.stringify({email: email}))
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
    }

    getToken(): string {
      let token = JSON.parse(localStorage.getItem('token'));

      // if(token){
      //   this.verifyToken(token).pipe(untilDestroyed(this)).subscribe(
      //     (res: any) => {
      //       return token;
      //     },
      //     (err: HttpErrorResponse) => {
      //       if(err.status === 401 && localStorage.getItem('refreshToken')){
      //         let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      //         this.verifyToken(refreshToken)
      //         .pipe(untilDestroyed(this)).subscribe(
      //           (res: any) => {
      //             localStorage.setItem("token", JSON.stringify(res.accessToken));
      //             localStorage.setItem("refreshToken", JSON.stringify(res.refreshToken));
  
      //             token = JSON.parse(localStorage.getItem('token'));
      //             return token;
      //           }
      //         )
      //       }
      //     }
      //   );
      // }

      return token;
    }

    verifyToken(token):Observable<any> {
      const PATH = this.AUTH_URL + `/refresh-token`;
      return this.http.post<any>(PATH, JSON.stringify({token: token}))
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
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

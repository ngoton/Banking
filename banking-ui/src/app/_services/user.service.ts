import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { Router } from '@angular/router';
// import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UtilitiesService } from './utilities.service';
import { AuthService } from './auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  public today = Date();
  randomNumber: any;

  private Req_URL = environment.BASE_URL + environment.REQ_SERV;

  private USER_URL = environment.BASE_URL + environment.USER_SERV;
  private STAFF_URL = environment.BASE_URL + environment.STAFF_SERV;
  private CUST_URL = environment.BASE_URL + environment.CUST_SERV;

  // Observable string sources: user
  private userDetailSource = new BehaviorSubject<any>(null);
  private userErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: user
  userDetail$ = this.userDetailSource.asObservable();
  userError$ = this.userErrorSource.asObservable();
  // Customer Details Observable
  private customerDetailsSource = new Subject<CustomerInformation>();
  customerDetailsObserver = this.customerDetailsSource.asObservable();
  // Customer Details Observable
  private fullCustomerDetailsSource = new Subject<CustomerInformation>();
  fullCustomerDetailsObserver = this.fullCustomerDetailsSource.asObservable();

  constructor(private http: HttpClient, private util: UtilitiesService, private auth: AuthService, private router: Router) {}

  // Http Headers
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${this.auth.getToken()}`
  //   })
  // };
  

  updateUser(user) {
    this.userDetailSource.next(user);
  }

  updateUserError(error) {
    this.userErrorSource.next(error);
  }

  getUserDetails(): any {
    let userDetails = null;

    this.userDetail$.pipe(untilDestroyed(this)).subscribe(user => (userDetails = user));
    if (!userDetails) {
      userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }
    return userDetails;
  }

  getUserInfor(): Observable<any> {
    const PATH = this.USER_URL + `/info`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  getStaffInfor(id): Observable<any> {
    const PATH = this.STAFF_URL + `/user/${id}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  getCustomerInfor(id): Observable<any> {
    const PATH = this.CUST_URL + `/user/${id}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }
  
  changePassword(formData): Observable<any> {
    let accessToken = this.auth.getToken();
    if(formData.newPass !== formData.confirmPass){
      return throwError("Mật khẩu xác nhận và mật khẩu mới không khớp!");
    }
    
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let body = {
      userId: userDetails.userId,
      email: userDetails.email,
      newPassword: formData.newPass,
      confirmPassword: formData.confirmPass,
      currentPassword: formData.currentPass
    }

    const PATH = this.USER_URL + `/change-password`;
    return this.http.post<any>(PATH, JSON.stringify(body))
    .pipe(
      retry(3),
      //catchError(this.util.handleError)
    );
  }

  resetPassword(data, token): Observable<any> {
    localStorage.setItem("token", JSON.stringify(token));

    const PATH = this.USER_URL + `/reset-password`;

    return this.http.post<any>(PATH, JSON.stringify(data))
    .pipe();
  }

  ngOnDestroy(): void {}
}

export interface CustomerInformation {
  birthday: string;
  bvn: string;
  customerNumber: string;
  customerSegment: string;
  customerType: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
  residentialAddress: string;
}
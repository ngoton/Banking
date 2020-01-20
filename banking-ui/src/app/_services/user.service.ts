import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { retry } from 'rxjs/operators';
import { User } from '../_models/user';
// import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { untilDestroyed } from 'ngx-take-until-destroy';

const tempUserDetails = {
  id: '18424050',
  email: 'nmphong0601@gmail.com',
  role: 'personal',
  acctDetails: [
    {
      id: "01",
      code: "895835893523",
      first_name: "Nguyen",
      last_name: "Minh Phong",
      birth_date: "06-01-1996",
      gender: "Nam",
      phone: "08049824383",
      address: "TP.HCM",
      users_id: "18424050",
      payments_id: "1001",
      payment: {
        id: "1001",
        account: "439823948398355",
        balance: 200.000
      }
    },
    {
      id: "02",
      code: "89583589334534",
      first_name: "Nguyen",
      last_name: "Minh Phong",
      birth_date: "06-01-1996",
      gender: "Nam",
      phone: "08049824383",
      address: "TP.HCM",
      users_id: "18424050",
      payments_id: "1002",
      payment: {
        id: "1002",
        account: "439823948323523464",
        balance: 200.000
      }
    },
    {
      id: "03",
      code: "895835893242353",
      first_name: "Nguyen",
      last_name: "Minh Phong",
      birth_date: "06-01-1996",
      gender: "Nam",
      phone: "08049824383",
      address: "TP.HCM",
      users_id: "18424050",
      payments_id: "1003",
      payment: {
        id: "1003",
        account: "439823952364564567",
        balance: 200.000
      }
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  public today = Date();
  randomNumber: any;

  private CUST_URL = environment.BASE_URL + environment.CUST_SERV;
  private Req_URL = environment.BASE_URL + environment.REQ_SERV;
  // Observable string sources: user
  private userDetailSource = new BehaviorSubject<any[]>(null);
  private userErrorSource = new BehaviorSubject<any[]>(null);
  // Observable string streams: user
  userDetail$ = this.userDetailSource.asObservable();
  userError$ = this.userErrorSource.asObservable();
  // Customer Details Observable
  private customerDetailsSource = new Subject<CustomerInformation>();
  customerDetailsObserver = this.customerDetailsSource.asObservable();
  // Customer Details Observable
  private fullCustomerDetailsSource = new Subject<CustomerInformation>();
  fullCustomerDetailsObserver = this.fullCustomerDetailsSource.asObservable();

  constructor(private http: HttpClient) { }

  updateUser(user) {
    this.userDetailSource.next(user);
  }

  updateUserError(error) {
    this.userErrorSource.next(error);
  }

  getUserDetails(): User {
    let userDetails = null;
    localStorage.setItem('userDetails', JSON.stringify(tempUserDetails));

    this.userDetail$.pipe(untilDestroyed(this)).subscribe(user => (userDetails = user));
    if (!userDetails) {
      userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }
    return userDetails;
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
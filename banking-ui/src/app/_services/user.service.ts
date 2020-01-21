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
  customer: {
    id: 1000,
    code: "895835893523",
    first_name: "Nguyen",
    last_name: "Minh Phong",
    birth_date: "06-01-1996",
    gender: "Nam",
    phone: "08049824383",
    address: "TP.HCM",
    users_id: 18424050,
    payments_id: 1001,
    payment: {
      id: 1001,
      account: "439823948398355",
      balance: "200.000"
    },
    saving: {
      id: 1101,
      account: "28929480932840234",
      balance: "1,500.000"
    },
    credit: {
      id: 1201,
      account: "489328492839422942",
      money: "12,000.000",
      content: "",
      status: 1
    },
    debit: {
      id: 1301,
      account: "8492398237874350293",
      money: "5,000.000",
      content: "",
      status: 1
    }
  }
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
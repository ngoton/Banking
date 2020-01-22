import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../_services/utilities.service';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Customers, Savings, Credits, Debits } from '../../_models/customer.model';
import { CustomerService } from '../../_services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService implements OnDestroy {
  private cust_URL = environment.BASE_URL + environment.CUST_SERV;
  private Req_URL = environment.BASE_URL + environment.REQ_SERV;
  user: User;
  sessionId = localStorage.getItem('userToken');
  currentUserEmail: string[];

  private acctDetailSource = new BehaviorSubject<Customers>(null);
  acctDetail$ = this.acctDetailSource.asObservable();

  constructor(
    private http: HttpClient,
    private util: UtilitiesService,
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {

    customerService.getAcctDetailsData();
    // Subscribe to user Details from UserService
    setTimeout(() => {
      this.customerService.acctDetail$
        .pipe(untilDestroyed(this))
        .subscribe((response: Customers) => {
          this.updateAcctDetails(response);
        });
    }, 5000);
  }

  updateAcctDetails(accts) {
    this.acctDetailSource.next(accts);
  }

  ngOnDestroy(): void {}
}

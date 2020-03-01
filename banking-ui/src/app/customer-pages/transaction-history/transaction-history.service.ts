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
export class TransactionHistoryService implements OnDestroy {
  private CUST_URL = environment.BASE_URL + environment.CUST_SERV;

  constructor(
    private http: HttpClient,
    private customerService: CustomerService
  ) {
    this.customerService.getAcctDetailsData();
    this.customerService.getPaymentsData();
    this.customerService.getSavingsData();
  }

  ngOnDestroy(): void {}
}

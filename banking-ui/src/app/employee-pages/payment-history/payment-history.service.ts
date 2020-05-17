import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../../_services/utilities.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, retry, flatMap, finalize, mergeMap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Customers, Savings, Credits, Debits } from '../../_models/customer.model';
import { CustomerService } from '../../_services/customer.service';
import { PaymentTransactionService } from '../../_services/payment-transaction.service';
import { SavingTransactionService } from '../../_services/saving-transaction.service';
import { PaymentService } from '../../_services/payment.service';

@Injectable({
  providedIn: 'root'
})

export class PaymentHistoryService implements OnInit, OnDestroy {
  private CUST_URL = environment.BASE_URL + environment.CUST_SERV;

  paymentAndSaving$: Observable<[any, any]> = new Observable<[any, any]>();
  private transferSource = new BehaviorSubject<any>(null);
  transferHistoryData$ = this.transferSource.asObservable();

  private receiveSource = new BehaviorSubject<any>(null);
  receiveHistoryData$ = this.receiveSource.asObservable();

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private paymentTransactionService: PaymentTransactionService,
    private savingTransactionService: SavingTransactionService
  ) {
  }

  getReceiveHistoryData() {
    this.customerService.getPaymentAndSavingReceive().pipe(untilDestroyed(this))
    .subscribe(
      success => {
        this.receiveSource.next([success[0].content, success[1].content]);
      }
    );
  }

  getPaymentHistoryData() {
    const customer = JSON.parse(localStorage.getItem("customerInfor"));

    this.paymentService.getPaymentsByCustomerId(customer.customerId).pipe(untilDestroyed(this),
      mergeMap(
        payment => {
          const transferPayment = this.paymentTransactionService.getPaymentTransfer(payment.paymentId);
          const creditPayment = this.paymentTransactionService.getPaymentCredit(payment.paymentId);

          return forkJoin([transferPayment, creditPayment]);
        }
      ),
      finalize(() =>{})
    )
    .subscribe(
      success => {
        this.transferSource.next({transfer: success[0], credit: success[1]});
      }
    );
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {}
}

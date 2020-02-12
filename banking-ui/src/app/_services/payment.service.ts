import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private PAYMENT_URL = environment.BASE_URL + environment.PAYMENT_SERV;

  // Observable string sources: user
  private paymentsSource = new BehaviorSubject<any>(null);
  private paymentsErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: user
  payments$ = this.paymentsSource.asObservable();
  paymentError$ = this.paymentsErrorSource.asObservable();

  constructor(private http: HttpClient) { }

  updatePayment(payments) {
    this.paymentsSource.next(payments);
  }

  updatePaymentError(error) {
    this.paymentsSource.next(error);
  }

  getPaymentsByCustomerId(customerId) {
    const PATH = this.PAYMENT_URL + `/customerId/${customerId}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

}

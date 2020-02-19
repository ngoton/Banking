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

  constructor(private http: HttpClient) { }

  getPaymentsByCustomerId(customerId) {
    const PATH = this.PAYMENT_URL + `/customerId/${customerId}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

}

import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentTransactionService {
  private TRANSFER_URL = environment.BASE_URL + environment.TRANSF_SERV;

  constructor(private http: HttpClient) { }

  internalPayment(paymentTransaction, benificiary) {
    const body = {
      conten: paymentTransaction.content,
      money: paymentTransaction.money,
      paymentId: paymentTransaction.paymentId,
      beneficiaryAccount: paymentTransaction.beneficiaryAccount,
      name: benificiary.name,
      shortName: benificiary.shortName,
      bankName: benificiary.bankName,
      fee: paymentTransaction.fee
    }

    const PATH = this.TRANSFER_URL + `/payment`;
      return this.http.post<any>(PATH, JSON.stringify(body))
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  verifyPayment(paymentInfor, code) {
    const body = {
      conten: paymentInfor.content,
      money: paymentInfor.money,
      paymentId: paymentInfor.paymentId,
      beneficiaryId: paymentInfor.beneficiaryId,
      code: code,
      fee: paymentInfor.fee
    }

    const PATH = this.TRANSFER_URL + `/paymentVerify`;
      return this.http.post<any>(PATH, JSON.stringify(body))
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

}

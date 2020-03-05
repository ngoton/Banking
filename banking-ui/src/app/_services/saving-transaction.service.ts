import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SavingTransactionService {
  private TRANSFER_SAVING_URL = environment.BASE_URL + environment.TRANSF_SAVING_SERV;

  constructor(private http: HttpClient) { }

  getSavingReceive(savingId): Observable<any> {

    const PATH = this.TRANSFER_SAVING_URL + `/history/savingReceive/saving/${savingId}`;
    return this.http.get<any>(PATH).pipe();
  }

  getSavingReceiveByCustomer(customerId): Observable<any> {

    const PATH = this.TRANSFER_SAVING_URL + `/history/savingReceive/customer/${customerId}`;
    return this.http.get<any>(PATH).pipe();
  }
}

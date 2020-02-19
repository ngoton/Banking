import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Beneficiarys } from '../_models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class BenificiaryService {
  private BENIFI_URL = environment.BASE_URL + environment.AUX_BENEFICIARY;

  constructor(private http: HttpClient) { }

  getByCustomerCode(code): Observable<any> {
    debugger;
    const PATH = this.BENIFI_URL + `/customer/${code}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  update(data): Observable<any> {
    const PATH = this.BENIFI_URL;
      return this.http.put<any>(PATH, JSON.stringify(data))
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  delete(id): Observable<any> {
    const PATH = this.BENIFI_URL + `/${id}`;
      return this.http.delete<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

}

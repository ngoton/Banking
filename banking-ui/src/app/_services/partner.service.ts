import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Partners } from '../_models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private PARTNER_URL = environment.BASE_URL + environment.PARTNER_SERV;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    debugger;
    const PATH = this.PARTNER_URL;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  insert(data): Observable<any> {
    const PATH = this.PARTNER_URL;
      return this.http.post<any>(PATH, JSON.stringify(data))
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

}

import { Injectable, OnDestroy, Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private SAVING_URL = environment.BASE_URL + environment.SAVING_SERV;

  // Observable string sources: user
  private savingsSource = new BehaviorSubject<any>(null);
  private savingsErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: user
  savings$ = this.savingsSource.asObservable();
  savingsError$ = this.savingsErrorSource.asObservable();

  constructor(private http: HttpClient) { }

  updateSaving(savings) {
    this.savingsSource.next(savings);
  }

  updateSavingError(error) {
    this.savingsSource.next(error);
  }

  getSavingsByCustomerId(customerId) {
    const PATH = this.SAVING_URL + `/customerId/${customerId}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        //catchError(this.util.handleError)
      );
  }

  
}

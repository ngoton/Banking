import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable({
  providedIn: 'root'
})
export class DebitService implements OnDestroy {

  public DEBIT_URL = environment.BASE_URL + environment.DEBIT_SERV;

  constructor(private http: HttpClient, private router: Router) { }

  getByCustomerId(customerId): Observable<any> {
    const PATH = this.DEBIT_URL + `/customerId/${customerId}`;
    return this.http.get<any>(PATH)
    .pipe(untilDestroyed(this));
  }

  add(data): Observable<any> {
    const body = {
      account: data.account,
      money: data.money,
      content: data.content
    }

    const PATH = this.DEBIT_URL;
    return this.http.post<any>(PATH, JSON.stringify(body))
    .pipe();
  }

  cancel(data): Observable<any> {
    const body = {
      debitId: data.id,
      content: data.content
    }

    const PATH = this.DEBIT_URL + `/cancel`;
    return this.http.post<any>(PATH, JSON.stringify(body))
    .pipe();
  }

  ngOnDestroy(){}
}

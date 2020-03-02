import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable({
  providedIn: 'root'
})
export class CreditService implements OnDestroy {

  public CREDIT_URL = environment.BASE_URL + environment.CREDIT_SERV;

  constructor(private http: HttpClient, private router: Router) { }

  getByCustomerId(customerId): Observable<any> {
    const PATH = this.CREDIT_URL + `/customerId/${customerId}`;
    return this.http.get<any>(PATH)
    .pipe(untilDestroyed(this));  
  }

  cancel(data): Observable<any> {
    const body = {
      creditId: data.id,
      content: data.content
    }

    const PATH = this.CREDIT_URL + `/cancel`;
    return this.http.post<any>(PATH, JSON.stringify(body))
    .pipe();
  }

  pay(creditId, data): Observable<any> {
    const body = {
      content: data.content,
      fee: true
    }

    const PATH = this.CREDIT_URL + `/${creditId}/pay`;
    return this.http.post<any>(PATH, JSON.stringify(body))
    .pipe();
  }

  ngOnDestroy(){}
}

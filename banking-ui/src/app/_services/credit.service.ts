import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  public CREDIT_URL = environment.BASE_URL + environment.CREDIT_SERV;

  constructor(private http: HttpClient, private router: Router) { }

  getByCustomerId(customerId): Observable<any> {
    const PATH = this.CREDIT_URL + `/customerId/${customerId}`;
    return this.http.get<any>(PATH)
    .pipe();  
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
}

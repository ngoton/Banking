import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, from as fromPromise, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private PUB_KEY = environment.PUB_ENC_KEY;
  private PRIV_KEY = environment.PRIV_ENC_KEY;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private auth: AuthService, private ulti: UtilitiesService) { }

  // intercept (req, next) {
  //   const encrypt = new JsEncryptModule.JSEncrypt();
  //   encrypt.setPublicKey(this.PUB_KEY);
  //   const encrypted = encrypt.encrypt(JSON.stringify(req.body));
  //   console.log('encrypted');
  //   console.log(encrypted);
  //   const decrypt = new JsEncryptModule.JSEncrypt();
  //   decrypt.setPrivateKey(this.PRIV_KEY);
  //   const uncrypted = decrypt.decrypt(encrypted);
  //   console.log('uncrypted');
  //   console.log(JSON.parse(uncrypted));
  //   console.log(req);
  //   console.log(req.body);
  //   return next.handle(req);
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let observable = fromPromise(this.handleAccess(request, next));

    return observable.pipe(
      catchError((response: HttpErrorResponse) => {
        switch(response.status) {
          case 400:
            return Observable.throw(response.error.message);
          case 401:
            let token = JSON.parse(localStorage.getItem('token'));
            let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
            if(token && refreshToken){
              this.auth.verifyToken(refreshToken).pipe(takeUntil(this.destroy$)).subscribe(
                (res: any) => {
                  localStorage.setItem("token", JSON.stringify(res.accessToken));
                  localStorage.setItem("refreshToken", JSON.stringify(res.refreshToken));
                  return next.handle(request);
                },
                (err: HttpErrorResponse) => {
                  this.auth.logout();
                  return Observable.throw("Không thể xác thực tài khoản!");
                }
              )
            }
            break;
            case 403:
              return Observable.throw("Tài khoản này không có quyền truy cập!");
            case 404:
              return Observable.throw("Không tìm thấy dữ liệu!");
            case 405:
              return Observable.throw("Phương thức yêu cầu không hợp lệ!");
        }

        return Observable.throwError(response.error.message);
      })
    );
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
      Promise<HttpEvent<any>> {
    const token = await this.auth.getToken();
    
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = 'Bearer ' + token;
    }

    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({headers: newHeader});
    return next.handle(changedRequest).toPromise();
  }
}

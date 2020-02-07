import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, from as fromPromise } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private PUB_KEY = environment.PUB_ENC_KEY;
  private PRIV_KEY = environment.PRIV_ENC_KEY;

  constructor(private auth: AuthService) { }

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
    return fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
      Promise<HttpEvent<any>> {
        debugger;
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

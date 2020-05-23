import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { User } from '../../_models/user';
import { LoginData } from '../../_models/logindata';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { environment } from '../../../environments/environment';
import { UtilitiesService } from '../../_services/utilities.service';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { CustomerService } from '../../_services/customer.service';
import { UserService } from '../../_services/user.service';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Location } from '@angular/common';
import * as JsEncryptModule from 'jsencrypt';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Subscription } from 'rxjs';

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  providers: [AuthService, UserService, UtilitiesService, CustomerService],
  styleUrls: [
    "./login.component.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private readonly notifi: NotifierService;
  logging = false;
  loginForm: FormGroup;
  user: User;
  logindata: LoginData;
  submitted: boolean;
  rememberMe: boolean;
  loginError: string;
  public options = {
    position: ["bottom", "right"]
  };
  returnUrl: string;
  captchaVerified: string = "";

  public keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  //private subscription: Subscription = new Subscription();

  constructor(
    private location: Location,
    private notifications: NotifierService,
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilitiesService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.notifi = notifications;
    this.submitted = false;
    this.createForm();
    let token = JSON.parse(localStorage.getItem('token'));
    if(token){
      auth.clearLocalStorage();
    }
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm() {
    const reqID = this.util.generateNumber();
    this.loginForm = this.fb.group({
      Username: ["", Validators.required],
      Password: ["", Validators.required],
      RememberMe: false,
      RequestID: reqID,
      Channel: environment.CHANNEL
    });
  }

  resolved(captchaResponse: string) {
    this.captchaVerified = captchaResponse;
  }

  onSubmit(formdata) {
    if (formdata.RememberMe === true) {
      const userName = this.util.encrypt(formdata.Username);
      localStorage.setItem("userName", userName);
    }
    this.notifi.hide("loginError"); // remove login notification
    // this.notifications.html(
    //   `Logging in... <i class="fas fa-spin fa-circle-notch ml-3"></i>`,
    //   NotificationType.Info,
    //   {
    //     id: "login",
    //     timeOut: 20000,
    //     showProgressBar: true,
    //     animate: "scale"
    //   }
    // );
    this.notifi.show({
      id: `login`,
      message: `Đang đăng nhập vào hệ thống...`,
      type: `info`,
      template: this.customNotificationTmpl
    });
    this.logging = true;
    this.auth.login(formdata)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          console.log(res);
          // if Login is successful
          localStorage.setItem("token", JSON.stringify(res.accessToken));
          localStorage.setItem("refreshToken", JSON.stringify(res.refreshToken));
          this.getOnboardingJourney();
          this.logging = false;
        },
        (err: HttpErrorResponse) => {
          this.logging = false;
          this.notifi.hide("login"); // remove login notification
          this.errorAlert(err === undefined ? "Đăng nhập thất bại!" : "Đăng nhập thất bại! " + err);
          console.log(err);
        }
      );
  }

  // User Authentication
  getOnboardingJourney() {
    this.userService.getUserInfor()
        .pipe(untilDestroyed(this)).subscribe(
          (res: any) => {
            this.user = res;
            this.storeUserDetails(this.user);
            this.checkUserStatus(this.user);         
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }
        );
  }

  storeUserDetails(user) {
    this.userService.updateUser(user);
    localStorage.setItem("userDetails", JSON.stringify(user)); 
    // localStorage.removeItem('userDetails');
  }

  checkUserStatus(user) {
    this.authenticateUser(user);
  }

  authenticateUser(user) {
    this.notifications.hide('login'); // remove login notification
    setTimeout(() => {
      let userInfor = JSON.parse(localStorage.getItem('userDetails'));
      switch(userInfor.role){
        case 'ADMIN':
          this.router.navigate(['/employee', {role: 'ADMIN'}]);
          break;
        case 'STAFF':
          this.router.navigate(['/employee', {role: 'STAFF'}]);
          break;
        case 'USER':
          this.router.navigate(['/customer']);
          break;
      }
    }, 300);

  }

  shuffleKeyPad(keyArray: any[]) {
    let c = keyArray.length;
    while (c > 0) {
      const i = Math.floor(Math.random() * c);
      c--;
      const t = keyArray[c];
      keyArray[c] = keyArray[i];
      keyArray[i] = t;
    }
    return keyArray;
  }

  errorAlert(messageAlert: any) {
    // this.notifications.html(
    //   `<span class="f-12">${message}</span>`,
    //   NotificationType.Error,
    //   {
    //     id: "LoginError",
    //     timeOut: 10000,
    //     showProgressBar: true,
    //     animate: "scale"
    //   }
    // );
    this.notifi.show({
      id: `LoginError`,
      message: messageAlert,
      type: `error`,
      template: this.customNotificationTmpl
    });
    // this.notifications.notify(`error`, message, `LoginError`);
  }

  closeAlert() {
    this.loginError = null;
  }

  addPasswordString(value) {
    let key = this.loginForm.controls["Password"].value;
    key = key + value;
    this.loginForm.controls["Password"].setValue(key);
  }

  clearPasswordString() {
    this.loginForm.controls["Password"].setValue("");
  }

  deletePasswordString() {
    let PwString = this.loginForm.controls["Password"].value;
    PwString = PwString.slice(0, -1);
    this.loginForm.controls["Password"].setValue(PwString);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    // this.customerService.getAcctDetailsData();
    this.auth.ibankLogout();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  getConfigValue(key: string): any {};
}

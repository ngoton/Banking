import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { LoginData } from '../../_models/logindata';
import { Router } from '@angular/router';
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
import * as JsEncryptModule from 'jsencrypt';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  providers: [AuthService, UserService, UtilitiesService, CustomerService],
  styleUrls: [
    "./login.component.scss",
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss"
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  loginForm: FormGroup;
  user: User;
  logindata: LoginData;
  loading: boolean;
  submitted: boolean;
  rememberMe: boolean;
  loginError: string;
  public options = {
    position: ["bottom", "right"]
  };

  public keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  constructor(
    private notifications: NotifierService,
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilitiesService,
    private userService: UserService,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.submitted = false;
    this.createForm();
    this.keypadNumbers = this.shuffleKeyPad(this.keypadNumbers);
    let userName = localStorage.getItem("userName")
      ? localStorage.getItem("userName")
      : "";
    console.log(userName);
    userName = this.util.decrypt(userName);
    this.loginForm.controls["Username"].setValue(userName);
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

  onSubmit(formdata) {
    debugger;
    console.log(formdata);
    if (formdata.RememberMe === true) {
      const userName = this.util.encrypt(formdata.Username);
      console.log(userName);
      localStorage.setItem("userName", userName);
    }
    this.loading = true;
    this.notifications.hide("loginError"); // remove login notification
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
    this.notifications.show({
      id: `login`,
      message: `Đang đăng nhập vào hệ thống...`,
      type: `info`,
      template: this.customNotificationTmpl
    });

    this.auth.login(formdata)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          debugger;
          console.log(res);
          this.getOnboardingJourney(res);
        },
        (err: HttpErrorResponse) => {
          debugger;
          this.notifications.hide("login"); // remove login notification
          this.errorAlert(err.message === undefined ? "Đăng nhập thất bại!" : err);
          console.log(err);
        }
      );
    this.loading = false;
  }

  // User Authentication
  getOnboardingJourney(res) {
    this.loginError = null;
    if (res.responseCode === "00" || res.responseCode === "04") {
      // if Login is successful
      localStorage.setItem("token", JSON.stringify(res.accessToken));
      this.userService.getUserInforByToken()
      .pipe(untilDestroyed(this)).subscribe(
        (res: any) => {
          this.user = res;
          this.storeUserDetails(this.user);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
      //this.checkUserStatus(res);
    } else {
      this.notifications.hide("login"); // hide login notification
      this.loginError = res.responseDescription.replace(
        "Validation Failure -",
        ""
      );
      this.errorAlert(this.loginError);
      console.log(res);
      console.log(this.loginError); // Delete later
    } // Login returned error
  }

  storeUserDetails(user) {
    this.userService.updateUser(user);
    localStorage.setItem("userDetails", JSON.stringify(user));
    // localStorage.removeItem('userDetails');
    const users = JSON.parse(localStorage.getItem("userDetails"));
    console.log("User details stored in local storage"); // delete later
    console.log(users); // delete later
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
    this.notifications.show({
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

  ngOnInit(): void {
    // this.customerService.getAcctDetailsData();
    // this.auth.ibankLogout();
  }

  ngOnDestroy(): void {}

  getConfigValue(key: string): any {};
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../_services/user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from '../../_services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './forgot-password.component.scss',
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss"
]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  forgotPasswordForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  public options = {
    position: ["bottom", "right"]
  };

  constructor(
    private location: Location,
    private notifications: NotifierService, 
    private fb: FormBuilder,
    private authService: AuthService) {
      this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ["", Validators.required]
    });
  }

  onSubmit(formdata) {
    this.loading = true;
    this.notifications.hide("RequestPassError"); // remove change password notification

    this.notifications.show({
      id: `RequestPass`,
      message: `Đang gửi yêu cầu lấy lại mật khẩu...`,
      type: `info`,
      template: this.customNotificationTmpl
    });

    this.authService.requestPassword(formdata.email)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {

        },
        (err: HttpErrorResponse) => {
          this.notifications.hide("RequestPass"); // remove change password notification
          this.errorAlert(err.message === undefined ? "Gửi yêu cầu thất bại!" : err);
        }
      );
    this.loading = false;
  }

  errorAlert(messageAlert: any) {
    this.notifications.show({
      id: `RequestPassError`,
      message: messageAlert,
      type: `error`,
      template: this.customNotificationTmpl
    });
  }

  goBack() {
    this.location.back();
  }

  getConfigValue(key: string): any {};

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

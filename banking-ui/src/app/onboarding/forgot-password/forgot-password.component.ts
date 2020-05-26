import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../_services/user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from '../../_services/auth.service';
import { Location } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './forgot-password.component.scss',
    "../../../../node_modules/sweetalert2/src/sweetalert2.scss"
],
  encapsulation: ViewEncapsulation.None
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
    private route: Router,
    private notifications: NotifierService,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService) {
      this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ["", Validators.required]
    });
  }

  onSubmit(formdata) {
    debugger;

    this.loading = true;
    this.notifications.hide("RequestPassError"); // remove change password notification

    this.notifications.show({
      id: `RequestPass`,
      message: `Đang gửi yêu cầu lấy lại mật khẩu...`,
      type: `info`,
      template: this.customNotificationTmpl
    });

    this.authService.forgotPassword(formdata.email)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          this.dialogService.open(DialogOTPPromptComponent, { 
            context: {
              email: formdata.email,
            } 
          }).onClose.subscribe(
            (success: any ) => {
              if(success.accessToken){
                const infor = {
                  email: formdata.email,
                  newPassword: "1234567",
                  confirmPassword: "1234567"
                }
                this.userService.resetPassword(infor, success.accessToken).pipe(untilDestroyed(this))
                .subscribe(
                  success => {
                    
                    setTimeout(() => {
                      this.notifications.show({
                        id: `paied`,
                        message: `Reset mật khẩu thành công! Mật khẩu mới của bạn là: ${infor.newPassword}`,
                        type: `info`,
                        template: this.customNotificationTmpl
                      });
                    }, 5000);
                    
                    this.route.navigate(['onboarding/login']);
                  },
                  (err: HttpErrorResponse) => {
                    this.notifications.show({
                      id: `payError`,
                      message: `Không thể reset mật khẩu! ${err}`,
                      type: `error`,
                      template: this.customNotificationTmpl
                    });
                  }
                )
              }
            },
            (err: any) => {
              this.notifications.show({
                id: `payError`,
                message: `Không thể reset mật khẩu! ${err}`,
                type: `error`,
                template: this.customNotificationTmpl
              });
            })
        },
        (err: HttpErrorResponse) => {
          debugger;
          this.notifications.hide("RequestPass"); // remove change password notification
          this.errorAlert(err === undefined ? "Gửi yêu cầu thất bại!" : "Gửi yêu cầu thất bại! " + err);
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
    this.authService.clearLocalStorage();
  }

  ngOnDestroy() {
  }

}

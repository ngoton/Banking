import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from '../../_services/auth.service';
import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-dialog-otp-prompt-prompt',
  templateUrl: 'dialog-otp-prompt.component.html',
  styleUrls: ['dialog-otp-prompt.component.scss'],
})
export class DialogOTPPromptComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  sendingOTP = false;
  email: string;

  constructor(protected ref: NbDialogRef<DialogOTPPromptComponent>,
              private authService: AuthService,
              private notifications: NotifierService) {}

  cancel() {
    this.ref.close();
  }

  submit(code) {
    debugger;
    this.sendingOTP = true;
    this.authService.verifyResetPassword(this.email, code)
    .pipe(untilDestroyed(this))
    .subscribe(
      (res: any) => {
        this.sendingOTP = false;
        this.ref.close(res);
      },
      (err: HttpErrorResponse) => {
        this.notifications.show({
          id: `error`,
          message: `Không thể xác nhân OTP! ${err}`,
          type: `error`,
          template: this.customNotificationTmpl
        });
      }
    );
    
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

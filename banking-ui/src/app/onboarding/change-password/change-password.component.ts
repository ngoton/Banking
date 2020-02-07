import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../_services/user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss', "../../../../node_modules/sweetalert2/src/sweetalert2.scss"]
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;

  changePasswordForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  public options = {
    position: ["bottom", "right"]
  };

  constructor(
    private location: Location,
    private notifications: NotifierService, 
    private fb: FormBuilder, 
    private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this.fb.group({
      currentPass: ["", Validators.required],
      newPass: ["", Validators.required],
      confirmPass: ["", Validators.required]
    });
  }

  onSubmit(formdata) {
    this.loading = true;
    this.notifications.hide("ChangePassError"); // remove change password notification

    this.notifications.show({
      id: `ChangePass`,
      message: `Đang cập nhật mật khẩu...`,
      type: `info`,
      template: this.customNotificationTmpl
    });

    this.userService.changePassword(formdata)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {

        },
        (err: HttpErrorResponse) => {
          this.notifications.hide("ChangePass"); // remove change password notification
          this.errorAlert(err.message === undefined ? "Cập nhật thất bại!" : err);
        }
      );
    this.loading = false;
  }

  errorAlert(messageAlert: any) {
    this.notifications.show({
      id: `ChangePassError`,
      message: messageAlert,
      type: `error`,
      template: this.customNotificationTmpl
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  getConfigValue(key: string): any {};

}

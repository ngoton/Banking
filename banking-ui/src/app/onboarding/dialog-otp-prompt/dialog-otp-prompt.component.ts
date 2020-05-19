import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'ngx-dialog-otp-prompt-prompt',
  templateUrl: 'dialog-otp-prompt.component.html',
  styleUrls: ['dialog-otp-prompt.component.scss'],
})
export class DialogOTPPromptComponent implements OnInit, OnDestroy {
  sendingOTP = false;
  email: string;

  constructor(protected ref: NbDialogRef<DialogOTPPromptComponent>,
              private authService: AuthService) {}

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
      (err: any) => {
        
      }
    );
    
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

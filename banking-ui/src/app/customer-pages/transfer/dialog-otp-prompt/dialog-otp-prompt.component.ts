import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PaymentTransactions } from '../../../_models/customer.model';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-otp-dimiss-prompt',
  templateUrl: 'dialog-otp-prompt.component.html',
  styleUrls: ['dialog-otp-prompt.component.scss'],
})
export class DialogOTPPromptComponent {
  paymentInfor: PaymentTransactions;

  constructor(protected ref: NbDialogRef<DialogOTPPromptComponent>,
              private paymentTransactionService: PaymentTransactionService) {}

  cancel() {
    this.ref.close();
  }

  submit(code) {
    debugger;
    this.paymentTransactionService.verifyPayment(this.paymentInfor, code)
    .pipe(untilDestroyed(this))
    .subscribe(
      (res: any) => {
        this.ref.close(code);
      }
    );
    
  }
}

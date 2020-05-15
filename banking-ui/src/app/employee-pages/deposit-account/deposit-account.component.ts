import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentTransactionService } from '../../_services/payment-transaction.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { CustomerService } from '../../_services/customer.service';
import { PaymentService } from '../../_services/payment.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'ngx-deposit-account',
  templateUrl: './deposit-account.component.html',
  styleUrls: ['./deposit-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepositAccountComponent implements OnInit, OnDestroy {
  depositForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(private notifications: NotifierService,
              private fb: FormBuilder,
              private customerService: CustomerService,
              private paymentService: PaymentService,
              private paymentTransactionService: PaymentTransactionService) {
    this.createForm();
    this.notifier = notifications;
   }

  createForm() {

    this.depositForm = this.fb.group({
      account: ["", Validators.required],
      userName: ["", Validators.required],
      money: ["", Validators.required]
    });
  }

  accountChanged(account) {
    this.customerService.getByPaymentAccount(account).pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.depositForm.controls.userName.setValue(success.code);
      },
      (error: HttpErrorResponse) => {
        this.notifier.show({
          type: "error",
          message: `Không lấy được thông tin tài khoản! ${error}`,
          id: "account-error"
        });
      }
    );
  }

  userNameChanged(userName) {
    this.paymentService.getPaymentsByCustomerCode(userName).pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.depositForm.controls.account.setValue(success[0].account);
      },
      (error: HttpErrorResponse) => {
        this.notifier.show({
          type: "error",
          message: `Không lấy được thông tin tài khoản! ${error}`,
          id: "user-error"
        });
      }
    );
  }

  onSubmit(formData) {
    debugger;
    formData.content = `Nộp tiền tại quầy giao dịch ngày ${Date.now().toLocaleString()}`;
    this.paymentTransactionService.depositPayment(formData).pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.notifier.show({
          type: "success",
          message: "Nạp tiền thành công!",
          id: "deposit-success"
        });
        this.createForm();
      },
      (error: HttpErrorResponse) => {
        this.notifier.show({
          type: "error",
          message: `Nạp tiền không thành công! ${error}`,
          id: "deposit-error"
        });
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }
}

import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Customers, Beneficiarys, Payment, Savings, PaymentTransactions, AccountInfo } from '../../../_models/customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../../_services/payment.service';
import { SavingService } from '../../../_services/saving.service';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';
import { NbDialogService } from '@nebular/theme';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';
import { BenificiaryService } from '../../../_services/benificiary.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InternalComponent implements OnInit, OnDestroy {
  //@ViewChild("customNotification", { static: true }) customNotificationTmpl;
  loading = false;
  finished = false;
  private readonly notifier: NotifierService;

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  source: string;
  accountInfo: AccountInfo;
  internalAccounts: any[] = new Array();
  benificiary: Beneficiarys[] = new Array();
  selectedBenificiary: Beneficiarys = new Beneficiarys();
  payment: Payment = new Payment();

  paymentTransaction: PaymentTransactions = new PaymentTransactions();

  constructor(private customerService: CustomerService,
              private decimalPipe: DecimalPipe,
              private dialogService: NbDialogService,
              private paymentTransactionService: PaymentTransactionService,
              private benificiaryService: BenificiaryService,
              private notifications: NotifierService,
              private router: Router) {
                this.source = environment.BASE_URL + environment.ACC_SERV + `?bankName=HCB_BANK&account=`;
                this.notifier = notifications;
              }

  benificiaryChange(item: Beneficiarys) {
    this.selectedBenificiary = item;
    this.paymentTransaction.beneficiarysId = item.id;
    this.paymentTransaction.beneficiaryAccount = item.account;
    this.customerService.updateSelectedBeneficiaries(item);
  }

  paymentChange(item: Payment){
    this.paymentTransaction.paymentsId = item.paymentId;
  }

  ngOnInit() {
    this.customerService.payments$.pipe(untilDestroyed(this))
    .subscribe(
      (payment: Payment) => {
        // payment.balance = this.decimalPipe.transform(payment.balance, '1.3-3');
        this.internalAccounts.push(payment);
      }
    );
    
    this.customerService.beneficiaries$.pipe(untilDestroyed(this))
    .subscribe(
      (benificiaries: Beneficiarys[]) => {
        this.benificiary = benificiaries.filter(b => b.bankName == environment.BANK_NAME);
      }
    );
  }

  callBack(data: any): void {
    if(data != null){
      this.accountInfo = data;

      let benificiary = new Beneficiarys();
      benificiary.name = this.accountInfo.name;
      benificiary.account = this.accountInfo.account;
      benificiary.bankName = this.accountInfo.bankName;
      let savedBenificiary = this.benificiary.find(x => x.account == benificiary.account);
      if(savedBenificiary == null){
        this.benificiaryService.insert(benificiary).pipe(untilDestroyed(this))
        .subscribe(
          (response: any) => {
            this.selectedBenificiary = benificiary;
          }
        );
      }
      this.selectedBenificiary = benificiary;
    }
    else{
      this.selectedBenificiary = new Beneficiarys();
    }
    
  }

  onSubmit() {
    this.loading = true;
    this.paymentTransactionService.internalPayment(this.paymentTransaction, this.selectedBenificiary)
    .pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.loading = false;
        this.dialogService.open(DialogOTPPromptComponent, { 
          context: {
            paymentInfor: response
          } 
        }).onClose.subscribe((code: string ) => {
          if(code){
            this.finished = true;
            this.notifier.show({
              type: "success",
              message: "Chuyển tiền thành công!",
              id: "verify-success"
            });
          }
        });
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.notifier.show({
          type: "error",
          message: "Chuyển tiền không thành công!",
          id: "error-payment"
        });
      }
    );
  }

  goHome() {
    this.router.navigate(['customer/accounts']);
  }

  ngOnDestroy() {
  }

}

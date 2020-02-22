import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Payment, Savings, Customers, Beneficiarys, Partners, PaymentTransactions } from '../../../_models/customer.model';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { PartnerService } from '../../../_services/partner.service';
import { NotifierService } from 'angular-notifier';
import { NbDialogService } from '@nebular/theme';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';

@Component({
  selector: 'ngx-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit, OnDestroy {
  loading = false;
  finished = false;
  private readonly notifier: NotifierService;
  
  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  accounts: any[] = new Array();
  selectedPartner: Partners;
  partners: Partners[] = new Array();
  benificiary: Beneficiarys[] = new Array();
  selectedBenificiary: Beneficiarys = new Beneficiarys();

  paymentTransaction: PaymentTransactions = new PaymentTransactions();

  constructor(private customerService: CustomerService,
              private partnerService: PartnerService,
              private decimalPipe: DecimalPipe,
              private dialogService: NbDialogService,
              private paymentTransactionService: PaymentTransactionService,
              private notifications: NotifierService,
              private router: Router) {
                this.notifier = notifications;

                setTimeout(() => {
                  this.partnerService.getAll().pipe(untilDestroyed(this))
                  .subscribe(
                    (partners: Partners[]) => {
                      this.partners = partners;
                    }
                  );
                }, 1000);
  }

  ngOnInit() {
    this.customerService.payments$.pipe(untilDestroyed(this))
    .subscribe(
      (payment: Payment) => {
        // payment.balance = this.decimalPipe.transform(payment.balance, '1.3-3');
        this.accounts.push(payment);
      }
    );

    this.customerService.beneficiaries$.pipe(untilDestroyed(this))
    .subscribe(
      (benificiaries: Beneficiarys[]) => {
        this.benificiary = benificiaries.filter(b => b.bankName != environment.BANK_NAME);
      }
    );
  }

  onSubmit() {
    debugger;
    this.loading = true;
    this.paymentTransactionService.externalPayment(this.paymentTransaction, this.selectedBenificiary)
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
              id: "verify-success" // Again, this is optional
            });
          }
        });
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  benificiaryChange(item: Beneficiarys) {
    this.selectedBenificiary = item;
    this.paymentTransaction.beneficiarysId = item.id;
    this.paymentTransaction.beneficiaryAccount = item.account;
    this.customerService.updateSelectedBeneficiaries(item);
  }

  paymentChange(item: Payment){
    debugger;
    this.paymentTransaction.paymentsId = item.paymentId;
  }

  goHome() {
    this.router.navigate(['customer/accounts']);
  }

  partnerChange(item) {
    this.selectedPartner = item;
  }

  ngOnDestroy() {
  }

}

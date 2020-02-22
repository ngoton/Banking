import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Customers, Beneficiarys, Payment, Savings, PaymentTransactions } from '../../../_models/customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../../_services/payment.service';
import { SavingService } from '../../../_services/saving.service';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';
import { NbDialogService } from '@nebular/theme';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';
import { BenificiaryService } from '../../../_services/benificiary.service';

@Component({
  selector: 'ngx-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss']
})
export class InternalComponent implements OnInit, OnDestroy {

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  source: string;
  resultCustomer: Customers = new Customers();
  internalAccounts: any[] = new Array();
  benificiary: Beneficiarys[] = new Array();
  selectedBenificiary: Beneficiarys = new Beneficiarys();
  payment: Payment = new Payment();

  paymentTransaction: PaymentTransactions = new PaymentTransactions();

  constructor(private customerService: CustomerService,
              private decimalPipe: DecimalPipe,
              private dialogService: NbDialogService,
              private paymentTransactionService: PaymentTransactionService,
              private benificiaryService: BenificiaryService) {
                this.source = environment.BASE_URL + environment.CUST_SERV + '/payment';
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
        debugger;
        this.benificiary = benificiaries.filter(b => b.bankName == environment.BANK_NAME);
      }
    );
  }

  callBack(data: any): void {
    debugger;
    this.resultCustomer = data;
    this.resultCustomer.fullName = this.resultCustomer.firstName + ' ' + this.resultCustomer.lastName;

    let benificiary = new Beneficiarys();
    benificiary.name = this.resultCustomer.fullName;
    benificiary.account = this.paymentTransaction.beneficiaryAccount;
    benificiary.bankName = environment.BANK_NAME;
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

  onSubmit() {
    debugger;
    this.paymentTransaction.money = Number(this.paymentTransaction.money) * 1000;

    this.paymentTransactionService.internalPayment(this.paymentTransaction, this.selectedBenificiary)
    .pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.dialogService.open(DialogOTPPromptComponent, { 
          context: {
            paymentInfor: response
          } 
        }).onClose.subscribe((content: string ) => {});
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  ngOnDestroy() {
  }

}

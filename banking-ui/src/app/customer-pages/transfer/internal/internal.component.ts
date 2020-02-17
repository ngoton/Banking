import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Customers, Beneficiarys, Payment, Savings } from '../../../_models/customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../../_services/payment.service';
import { SavingService } from '../../../_services/saving.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'ngx-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss']
})
export class InternalComponent implements OnInit, OnDestroy {

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  accounts: any[] = new Array();
  benificiary: Beneficiarys[] = new Array();
  selectedBenificiary: Beneficiarys = new Beneficiarys();

  constructor(private customerService: CustomerService, 
              private paymentService: PaymentService,
              private savingService: SavingService,
              private decimalPipe: DecimalPipe) {
    this.customerService.getAcctDetailsData();

    setTimeout(() => {
      this.customerService.acctDetail$.pipe(untilDestroyed(this)).subscribe(
        (customerResponse: Customers) => {
          debugger;
          this.getPayment(customerResponse.customerId);
          this.getSaving(customerResponse.customerId);
          this.customerService.getBeneficiariesData();
        },
        (err: HttpErrorResponse) => {
          
        }
      );
    }, 2000);

  }

  getPayment(customerId){
    this.paymentService.getPaymentsByCustomerId(customerId)
    .pipe(untilDestroyed(this))
    .subscribe(
      (payment: Payment[]) => {
        payment[0].balance = this.decimalPipe.transform(payment[0].balance, '1.3-3');
        this.accounts.push(payment[0]);
      },
      (err: HttpErrorResponse)=> {
        
      }
    );
  }

  getSaving(customerId){
    this.savingService.getSavingsByCustomerId(customerId)
    .pipe(untilDestroyed(this))
    .subscribe(
      (saving: Savings[]) => {
        saving[0].balance = this.decimalPipe.transform(saving[0].balance, '1.3-3');
        this.accounts.push(saving[0]);
      },
      (err: HttpErrorResponse)=> {
        
      }
    );
  }

  benificiaryChange(item) {
    this.selectedBenificiary = item;
    this.customerService.updateSelectedBeneficiaries(item);
  }

  ngOnInit() {
    setTimeout(() => {
      this.customerService.beneficiaries$
        .pipe(untilDestroyed(this))
        .subscribe((benificiaryResponse: Beneficiarys[]) => {
          this.benificiary = benificiaryResponse;
        });
    }, 2000);
  }

  ngOnDestroy() {
  }

}

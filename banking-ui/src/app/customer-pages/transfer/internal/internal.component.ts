import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Customers, Beneficiarys, Payment, Savings } from '../../../_models/customer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../../_services/payment.service';
import { SavingService } from '../../../_services/saving.service';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss']
})
export class InternalComponent implements OnInit, OnDestroy {

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  internalAccounts: any[] = new Array();
  benificiary: Beneficiarys[] = new Array();
  selectedBenificiary: Beneficiarys = new Beneficiarys();

  constructor(private customerService: CustomerService,
              private decimalPipe: DecimalPipe) {}

  benificiaryChange(item) {
    this.selectedBenificiary = item;
    this.customerService.updateSelectedBeneficiaries(item);
  }

  ngOnInit() {
    this.customerService.payments$.pipe(untilDestroyed(this))
    .subscribe(
      (payment: Payment) => {
        // payment.balance = this.decimalPipe.transform(payment.balance, '1.3-3');
        this.internalAccounts.push(payment);
      }
    );

    this.customerService.savings$.pipe(untilDestroyed(this))
    .subscribe(
      (saving: Savings) => {
        // saving.balance = this.decimalPipe.transform(saving.balance, '1.3-3');
        this.internalAccounts.push(saving);
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

  ngOnDestroy() {
  }

}

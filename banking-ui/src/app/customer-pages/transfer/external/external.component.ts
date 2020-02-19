import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Payment, Savings, Customers, Beneficiarys } from '../../../_models/customer.model';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit, OnDestroy {

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  accounts: any[] = new Array();
  benificiary: Beneficiarys[] = new Array();

  constructor(private customerService: CustomerService,
              private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
    this.customerService.payments$.pipe(untilDestroyed(this))
    .subscribe(
      (payment: Payment) => {
        // payment.balance = this.decimalPipe.transform(payment.balance, '1.3-3');
        this.accounts.push(payment);
      }
    );

    this.customerService.savings$.pipe(untilDestroyed(this))
    .subscribe(
      (saving: Savings) => {
        // saving.balance = this.decimalPipe.transform(saving.balance, '1.3-3');
        this.accounts.push(saving);
      }
    );

    this.customerService.beneficiaries$.pipe(untilDestroyed(this))
    .subscribe(
      (benificiaries: Beneficiarys[]) => {
        this.benificiary = benificiaries.filter(b => b.bankName != environment.BANK_NAME);
      }
    );
  }

  ngOnDestroy() {
  }

}

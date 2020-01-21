import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customers, Payment, Savings, Credits, Debits } from '../_customer-model/customer.model';
import { CustomerService } from '../_customer-service/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [CustomerService]
})
export class AccountsComponent implements OnInit, OnDestroy {
  public account: Customers;
  public savingAccount: Savings;
  public creditAccount: Credits;
  public debitAccount: Debits;

  constructor(private customerService: CustomerService) {
    this.customerService.getAcctDetailsData();

    setTimeout(() => {
      this.customerService.acctDetail$.pipe(untilDestroyed(this))
        .subscribe((acct: Customers) => {
          debugger;
          this.account = acct;
          this.savingAccount = acct.saving;
          this.creditAccount = acct.credit;
          this.debitAccount = acct.debit;
          console.log("accounts: ", this.account);
        });
    }, 1000);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  getPayment(object, key): string {
    return object[key];
  }

}

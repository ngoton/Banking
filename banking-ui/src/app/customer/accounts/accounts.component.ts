import { Component, OnInit, OnDestroy } from '@angular/core';
import { AcctDetails, Payment } from '../_customer-model/customer.model';
import { CustomerService } from '../_customer-service/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [CustomerService]
})
export class AccountsComponent implements OnInit, OnDestroy {
  public accounts: AcctDetails[];
  public selectedAcct: AcctDetails;

  constructor(private customerService: CustomerService) {
    this.customerService.getAcctDetailsData();

    setTimeout(() => {
      this.customerService.acctDetail$.pipe(untilDestroyed(this))
        .subscribe(accts => this.accounts = accts);
      this.customerService.selectedAcctDetail$.pipe(untilDestroyed(this))
        .subscribe(selected => this.selectedAcct = selected);
    }, 1000);
  }

  ngOnInit(): void {
    console.log("accounts: ", this.accounts);
  }

  ngOnDestroy(): void {

  }

  getPayment(object, key): string {
    return object[key];
  }

}

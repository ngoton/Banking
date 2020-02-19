import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';
import { PaymentService } from '../../_services/payment.service';
import { SavingService } from '../../_services/saving.service';
import { DecimalPipe } from '@angular/common';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Customers, Payment, Savings } from '../../_models/customer.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {

  constructor(private customerService: CustomerService, 
    private paymentService: PaymentService,
    private savingService: SavingService,
    private decimalPipe: DecimalPipe) {
      this.customerService.getAcctDetailsData();
      this.customerService.getPaymentsData();
      this.customerService.getSavingsData();
      this.customerService.getBeneficiariesData();
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}

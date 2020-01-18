import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsPaymentRoutingModule } from './bills-payment-routing.module';
import { BillsPaymentComponent } from './bills-payment.component';


@NgModule({
  declarations: [BillsPaymentComponent],
  imports: [
    CommonModule,
    BillsPaymentRoutingModule
  ]
})
export class BillsPaymentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
// import { PaymentHistoryCardsComponent } from './payment-history-cards/payment-history-cards.component';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentHistoryComponent } from './payment-history.component';

@NgModule({
  declarations: [PaymentHistoryComponent],
  imports: [
    CommonModule,
    PaymentHistoryRoutingModule,
    SharedModule
  ]
})
export class PaymentHistoryModule { }

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { AcctDetailsComponent } from '../customer/accounts/acct-details/acct-details.component';
import { IbTrackitComponent } from '../customer/ib-trackit/ib-trackit.component';
import { FrequentTransfersComponent } from '../customer/transfer/frequent-transfers/frequent-transfers.component';
import {
  PaymentHistoryCardsComponent
} from '../customer/bills-payment/payment-history/payment-history-cards/payment-history-cards.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxCarouselModule } from 'ngx-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalAnimationComponent,
    AcctDetailsComponent,
    IbTrackitComponent,
    FrequentTransfersComponent,
    PaymentHistoryCardsComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    NgxCarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    SpinnerComponent,
    ModalAnimationComponent,
    AcctDetailsComponent,
    IbTrackitComponent,
    FrequentTransfersComponent,
    PaymentHistoryCardsComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}

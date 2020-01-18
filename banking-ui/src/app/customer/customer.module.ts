import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../shared/shared.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BillsPaymentComponent } from './bills-payment/bills-payment.component';

@NgModule({
  declarations: [CustomerComponent, BreadcrumbsComponent, BillsPaymentComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    NgxCarouselModule,
    NgbModule
  ]
})
export class CustomerModule { }

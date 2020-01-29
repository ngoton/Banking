import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { CustomerPagesComponent } from './customer-pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountsModule } from './accounts/accounts.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';
import { TransferModule } from './transfer/transfer.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { CustomerPagesRoutingModule } from './customer-pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    CustomerPagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    AccountsModule,
    BeneficiaryModule,
    TransferModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    CustomerPagesComponent
  ],
})
export class CustomerPagesModule {
}

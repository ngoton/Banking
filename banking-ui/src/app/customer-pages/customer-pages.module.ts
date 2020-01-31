import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { CustomerPagesComponent } from './customer-pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccountsModule } from './accounts/accounts.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';
import { TransferModule } from './transfer/transfer.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { CustomerPagesRoutingModule } from './customer-pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FsIconComponent } from './transaction-history/transaction-history.component';

@NgModule({
  imports: [
    CustomerPagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    DashboardModule,
    AccountsModule,
    BeneficiaryModule,
    TransferModule,
    ECommerceModule,
    MiscellaneousModule
  ],
  declarations: [
    CustomerPagesComponent,
    TransactionHistoryComponent,
    FsIconComponent
  ]
})
export class CustomerPagesModule {}

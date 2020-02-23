import { NgModule } from '@angular/core';
import { NbMenuModule, NbSpinnerModule } from '@nebular/theme';
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
import { SharedModule } from '../shared/shared.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
    preset: 'fade',
    speed: 300,
    easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    }
  }
};

@NgModule({
  imports: [
    CustomerPagesRoutingModule,
    ThemeModule,
    NbSpinnerModule,
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
    MiscellaneousModule,
    NotifierModule.withConfig(customNotifierOptions),
    SharedModule
  ],
  declarations: [
    CustomerPagesComponent,
    TransactionHistoryComponent,
    FsIconComponent
  ]
})
export class CustomerPagesModule {}

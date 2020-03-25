import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbMenuModule } from '@nebular/theme';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbSelectModule,
  NbButtonModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { CurrencyMaskModule } from 'ngx-currency-mask';

import { EmployeePagesRoutingModule } from './employee-pages-routing.module';
import {EmployeePagesComponent} from './employee-pages.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FsIconComponent } from './transaction-history/transaction-history.component';
import { DepositAccountComponent } from './deposit-account/deposit-account.component';
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
  declarations: [
      EmployeePagesComponent,
      TransactionHistoryComponent,
      FsIconComponent,
      DepositAccountComponent,
    ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    ThemeModule,
    EmployeePagesRoutingModule,
    NbSelectModule,
    NbButtonModule,
    CurrencyMaskModule,
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class EmployeePagesModule { }

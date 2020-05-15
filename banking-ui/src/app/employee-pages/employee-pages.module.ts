import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbMenuModule,
  NbSpinnerModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbSelectModule,
  NbButtonModule,
  NbRadioModule,
  NbDatepicker,
  NbDatepickerModule,
  NbDialogModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { CurrencyMaskModule } from 'ngx-currency-mask';

import { EmployeePagesRoutingModule } from './employee-pages-routing.module';
import {EmployeePagesComponent} from './employee-pages.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FsIconComponent } from './transaction-history/transaction-history.component';
import { DepositAccountComponent } from './deposit-account/deposit-account.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { DialogEmployeePromptComponent } from './employee-manager/dialog-employee-prompt/dialog-employee-prompt.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

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
      EmployeeManagerComponent,
      DialogEmployeePromptComponent,
      PaymentHistoryComponent
    ],
  entryComponents: [DialogEmployeePromptComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbMenuModule,
    NbSpinnerModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    NbRadioModule,
    NbDatepickerModule,
    ThemeModule,
    EmployeePagesRoutingModule,
    NbSelectModule,
    NbButtonModule,
    CurrencyMaskModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbDateFnsDateModule.forRoot({ format: 'yyyy-MM-dd' }),
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [DecimalPipe]
})
export class EmployeePagesModule { }

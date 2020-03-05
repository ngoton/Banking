import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


import { EmployeePagesRoutingModule } from './employee-pages-routing.module';
import {EmployeePagesComponent} from './employee-pages.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { FsIconComponent } from './transaction-history/transaction-history.component';
import { DepositAccountComponent } from './deposit-account/deposit-account.component';


@NgModule({
  declarations: [
      EmployeePagesComponent,
      TransactionHistoryComponent,
      FsIconComponent,
      DepositAccountComponent,
    ],
  imports: [
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

  ]
})
export class EmployeePagesModule { }

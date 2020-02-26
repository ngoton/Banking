import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbMenuModule } from '@nebular/theme';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';


import { EmployeePagesRoutingModule } from './employee-pages-routing.module';
import {EmployeePagesComponent} from './employee-pages.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';


@NgModule({
  declarations: [EmployeePagesComponent, TransactionHistoryComponent,],
  imports: [
    CommonModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    ThemeModule,
    EmployeePagesRoutingModule,

  ]
})
export class EmployeePagesModule { }

import { NgModule } from '@angular/core';
import {
  NbSpinnerModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TransactionHistoryComponent } from './transaction-history.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbSpinnerModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule
  ],
  declarations: [
    TransactionHistoryComponent
  ],
  providers: [DecimalPipe]
})
export class TransactionHistoryModule { }

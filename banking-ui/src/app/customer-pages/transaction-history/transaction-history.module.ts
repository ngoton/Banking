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
  providers: [DecimalPipe]
})
export class TransactionHistoryModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbInputModule,
  NbAccordionModule
} from '@nebular/theme';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { InternalComponent } from './internal/internal.component';
import { ExternalComponent } from './external/external.component';

import { ThemeModule } from '../../@theme/theme.module';
import { StatusCardComponent } from './status-card/status-card.component';
import { TransferTypeComponent } from './transfer-type/transfer-type.component';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { CurrencyMaskModule } from 'ngx-currency-mask';

@NgModule({
  declarations: [TransferComponent, InternalComponent, ExternalComponent, StatusCardComponent, TransferTypeComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbAccordionModule,
    RouterModule,
    TransferRoutingModule,
    CurrencyMaskModule,
    MatAutocompleteModule,
    MatOptionModule
  ]
})
export class TransferModule { }

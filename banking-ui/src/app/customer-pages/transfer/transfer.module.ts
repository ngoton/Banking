import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
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
  NbAccordionModule,
  NbDialogModule,
  NbPopoverModule,
  NbTooltipModule,
  NbWindowModule
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
import { SharedModule } from '../../shared/shared.module';
import { DialogOTPPromptComponent } from './dialog-otp-prompt/dialog-otp-prompt.component';

@NgModule({
  declarations: [
    TransferComponent, 
    InternalComponent, 
    ExternalComponent, 
    StatusCardComponent, 
    TransferTypeComponent, 
    DialogOTPPromptComponent],
  entryComponents: [DialogOTPPromptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    NbDialogModule.forChild(),
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    NbButtonModule,
    NbAccordionModule,
    RouterModule,
    TransferRoutingModule,
    CurrencyMaskModule,
    MatAutocompleteModule,
    MatOptionModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class TransferModule { }

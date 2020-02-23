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
  NbWindowModule,
  NbSpinnerModule
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
    NotifierModule.withConfig(customNotifierOptions),
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class TransferModule { }

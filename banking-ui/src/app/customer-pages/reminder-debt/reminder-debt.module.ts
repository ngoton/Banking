import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ReminderDebtRoutingModule } from './reminder-debt-routing.module';
import { ReminderDebtComponent } from './reminder-debt.component';
import { RemiderListComponent } from './remider-list/remider-list.component';
import { RemiderDetailComponent } from './remider-detail/remider-detail.component';

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
import { ThemeModule } from '../../@theme/theme.module';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { CurrencyMaskModule } from 'ngx-currency-mask';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogDimissPromptComponent } from './dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DialogOTPPromptComponent } from './dialog-otp-prompt/dialog-otp-prompt.component';
import { DebitListComponent } from './remider-list/debit-list/debit-list.component';
import { CreditListComponent } from './remider-list/credit-list/credit-list.component';

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
    ReminderDebtComponent, 
    RemiderListComponent, 
    RemiderDetailComponent, 
    DialogDimissPromptComponent, 
    DialogOTPPromptComponent, 
    DebitListComponent, 
    CreditListComponent],
  entryComponents: [DialogDimissPromptComponent, DialogOTPPromptComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReminderDebtRoutingModule,
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
    NbButtonModule,
    NbAccordionModule,
    NbDialogModule.forChild(),
    NotifierModule.withConfig(customNotifierOptions),
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    CurrencyMaskModule,
    MatAutocompleteModule,
    MatOptionModule,
    Ng2SmartTableModule,
    SharedModule
  ],
  providers: [DecimalPipe],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ReminderDebtModule { }

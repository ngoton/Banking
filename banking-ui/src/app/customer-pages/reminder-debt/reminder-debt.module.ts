import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [ReminderDebtComponent, RemiderListComponent, RemiderDetailComponent, DialogDimissPromptComponent],
  entryComponents: [DialogDimissPromptComponent],
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
    NbPopoverModule,
    NbTooltipModule,
    NbWindowModule,
    CurrencyMaskModule,
    MatAutocompleteModule,
    MatOptionModule,
    Ng2SmartTableModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ReminderDebtModule { }

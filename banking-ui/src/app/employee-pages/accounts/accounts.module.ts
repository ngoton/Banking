import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { NewAccountComponent } from './new-account/new-account.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbDatepickerModule,
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
  NbSpinnerModule,
  NbCheckboxModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { StatusCardComponent } from './status-card/status-card.component';

@NgModule({
  declarations: [AccountsComponent, NewAccountComponent, StatusCardComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    CommonModule,
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
    AccountsRoutingModule,
    NbCheckboxModule,
  ]
})
export class AccountsModule { }

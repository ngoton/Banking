import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { NewAccountComponent } from './new-account/new-account.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    NotifierModule.withConfig(customNotifierOptions)
  ]
})
export class AccountsModule { }

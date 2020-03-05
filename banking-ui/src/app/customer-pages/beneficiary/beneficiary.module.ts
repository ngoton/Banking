import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryComponent } from './beneficiary.component';

import { NbSpinnerModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { NotifierOptions, NotifierModule } from 'angular-notifier';

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
  declarations: [BeneficiaryComponent],
  imports: [
    CommonModule,
    NbSpinnerModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NotifierModule.withConfig(customNotifierOptions),
  ]
})
export class BeneficiaryModule { }

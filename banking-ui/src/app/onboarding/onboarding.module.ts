import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbAlertModule,
  NbInputModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { OnboardingComponent } from './onboarding.component';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './onboarding-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

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
    autoHide: 5000,
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
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbActionsModule,
    NbLayoutModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
    NbCardModule,
    NbAlertModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    MiscellaneousModule,
    NbInputModule
  ],
  declarations: [
    OnboardingComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
  ],
})
export class OnboardingModule {
}

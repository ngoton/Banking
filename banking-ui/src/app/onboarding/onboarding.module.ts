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
  NbAlertModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { OnboardingComponent } from './onboarding.component';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './onboarding-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

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
    MiscellaneousModule,
  ],
  declarations: [
    OnboardingComponent,
  ],
})
export class OnboardingModule {
}

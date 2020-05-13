import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  NbDialogModule,
  NbListModule,
  NbPopoverModule,
  NbCardModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  IBankingCustomerFooterComponent,
  IBankingCustomerHeaderComponent,
  IBankingEmployeeFooterComponent,
  IBankingEmployeeHeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
  GeneralHeaderComponent,
  GeneralFooterComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  CustomerLayoutComponent,
  EmployeeLayoutComponent,
  GeneralLayoutComponent
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { NotificationSocketService } from '../_services/notification-socket.service';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDialogModule,
  NbListModule,
  NbPopoverModule,
  NbCardModule,
  NbSpinnerModule
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  GeneralHeaderComponent,
  GeneralFooterComponent,
  IBankingCustomerFooterComponent,
  IBankingCustomerHeaderComponent,
  IBankingEmployeeFooterComponent,
  IBankingEmployeeHeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  CustomerLayoutComponent,
  EmployeeLayoutComponent,
  GeneralLayoutComponent
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [NotificationSocketService]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
      ],
    };
  }
}

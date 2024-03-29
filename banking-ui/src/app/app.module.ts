/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbInputModule,
  NbButtonModule,
} from '@nebular/theme';

import { NotifierModule, NotifierService } from 'angular-notifier';
import { CurrencyPipe } from '@angular/common';
import { InterceptorService } from './_services/interceptor.service';
import { CurrencyMaskModule } from "ngx-currency-mask";
import { DialogOTPPromptComponent } from './onboarding/dialog-otp-prompt/dialog-otp-prompt.component';
import { registerLocaleData } from '@angular/common';
import localeVN from "@angular/common/locales/vi";
registerLocaleData(localeVN, "vi");

@NgModule({
  declarations: [AppComponent, DialogOTPPromptComponent],
  entryComponents: [DialogOTPPromptComponent],
  imports: [
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ThemeModule.forRoot(),
    CurrencyMaskModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NotifierModule.withConfig({
      // Custom options in here
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    NotifierService,
    CurrencyPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

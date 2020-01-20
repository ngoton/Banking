import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './_services/interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';

@NgModule({
  declarations: [AppComponent, CustomerComponent, OnboardingComponent, SessionTimeoutModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      // Custom options in here
    }),
    NgbModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
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
  bootstrap: [AppComponent]
})
export class AppModule {}

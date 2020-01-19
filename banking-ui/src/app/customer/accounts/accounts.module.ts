import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { ButtonsModule, WavesModule, CardsModule, IconsModule } from 'angular-bootstrap-md'


@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ButtonsModule,
    WavesModule,
    CardsModule,
    IconsModule
  ]
})
export class AccountsModule { }

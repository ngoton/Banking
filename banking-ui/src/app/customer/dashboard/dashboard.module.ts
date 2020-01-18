import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { NotifierModule } from 'angular-notifier';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { SelectOptionService } from '../../shared/elements/select-option.service';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    SelectModule,
    NotifierModule.withConfig(),
    NgxCarouselModule,
    // JsonpModule,
    NgbModule
  ],
  providers: [SelectOptionService],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }

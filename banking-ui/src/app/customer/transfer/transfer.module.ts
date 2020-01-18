import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
// import { FrequentTransfersComponent } from './frequent-transfers/frequent-transfers.component';


@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    TransferRoutingModule
  ]
})
export class TransferModule { }

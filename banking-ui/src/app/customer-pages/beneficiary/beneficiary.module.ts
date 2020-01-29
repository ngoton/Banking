import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryComponent } from './beneficiary.component';

import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [BeneficiaryComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule
  ]
})
export class BeneficiaryModule { }

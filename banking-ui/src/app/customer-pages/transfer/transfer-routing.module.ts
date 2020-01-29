import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferComponent } from './transfer.component';
import { InternalComponent } from './internal/internal.component';
import { ExternalComponent } from './external/external.component';
import { TransferTypeComponent } from './transfer-type/transfer-type.component';

const routes: Routes = [{
  path: '',
  component: TransferComponent,
  children: [
    {
      path: '',
      component: TransferTypeComponent,
    },
    {
      path: 'internal',
      component: InternalComponent,
    },
    {
      path: 'external',
      component: ExternalComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferRoutingModule { }

export const routedComponents = [
  TransferComponent,
  InternalComponent,
  ExternalComponent
];

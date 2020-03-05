import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CustomerPagesComponent } from './customer-pages.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPagesComponent,
    children: [
      {
        path: 'accounts',
        component: AccountsComponent
      },
      {
        path: 'beneficiary',
        component: BeneficiaryComponent
      },
      {
        path: 'transfer',
        loadChildren: () =>
          import('./transfer/transfer.module').then(m => m.TransferModule)
      },
      {
        path: 'reminder-debt',
        loadChildren: () =>
          import('./reminder-debt/reminder-debt.module').then(
            m => m.ReminderDebtModule
          )
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      },
      {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'accounts',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPagesRoutingModule {
}

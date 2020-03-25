import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePagesComponent } from './employee-pages.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { from } from 'rxjs';
import { DepositAccountComponent } from './deposit-account/deposit-account.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeePagesComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then(
            m => m.AccountsModule
          )
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      },
      {
        path: 'deposit-account',
        component: DepositAccountComponent
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
  exports: [RouterModule]
})
export class EmployeePagesRoutingModule { }

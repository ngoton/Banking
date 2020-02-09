import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeePagesComponent } from './employee-pages.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeePagesRoutingModule { }

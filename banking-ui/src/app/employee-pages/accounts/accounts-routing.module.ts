import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountsComponent} from '../../employee-pages/accounts/accounts.component';
import {NewAccountComponent} from './new-account/new-account.component';

const routes: Routes = [
  {
    path:'',
    component: AccountsComponent,
    children:[
      {
        path: 'new-account',
        component:NewAccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }

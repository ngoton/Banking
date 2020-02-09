import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemiderListComponent } from './remider-list/remider-list.component';
import { RemiderDetailComponent } from './remider-detail/remider-detail.component';
import { ReminderDebtComponent } from './reminder-debt.component';

const routes: Routes = [
  {
    path: '',
    component: ReminderDebtComponent,
    children: [
      {
        path: '',
        component: RemiderListComponent
      },
      {
        path: 'new',
        component: RemiderDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReminderDebtRoutingModule { }
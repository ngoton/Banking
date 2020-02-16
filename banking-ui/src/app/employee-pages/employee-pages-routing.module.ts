import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: EmployeePagesComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: () =>
          import('./miscellaneous/miscellaneous.module').then(
            m => m.MiscellaneousModule
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

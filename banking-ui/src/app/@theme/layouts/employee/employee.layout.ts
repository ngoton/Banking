import { Component } from '@angular/core';

@Component({
  selector: 'ngx-employee-layout',
  styleUrls: ['./employee.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-ibanking-employee-header></ngx-ibanking-employee-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-ibanking-employee-footer></ngx-ibanking-employee-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class EmployeeLayoutComponent {}

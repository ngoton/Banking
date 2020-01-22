import { Component } from '@angular/core';

@Component({
  selector: 'ngx-customer-layout',
  styleUrls: ['./customer.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-ibanking-customer-header></ngx-ibanking-customer-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-ibanking-customer-footer></ngx-ibanking-customer-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class CustomerLayoutComponent {}

import { Component } from '@angular/core';

import { MENU_ITEMS } from './customer-pages-menu';

@Component({
  selector: 'ngx-customer-pages',
  styleUrls: ['customer-pages.component.scss'],
  template: `
    <ngx-customer-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-customer-layout>
  `,
})
export class CustomerPagesComponent {

  menu = MENU_ITEMS;
}

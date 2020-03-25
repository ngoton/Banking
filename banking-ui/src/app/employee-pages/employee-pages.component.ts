import { Component, OnInit, OnDestroy } from '@angular/core';
import { MENU_ITEMS, MENU_ADMIN_ITEMS } from './employee-pages-menu';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-employee-pages',
  templateUrl: './employee-pages.component.html',
  styleUrls: ['./employee-pages.component.scss']
})
export class EmployeePagesComponent implements OnInit, OnDestroy {

  role: string;
  menu: NbMenuItem[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.menu = MENU_ITEMS;
    this.route.params.subscribe(params => {
      this.role = params['role']; 
      if(this.role == 'ADMIN'){
        this.menu = MENU_ADMIN_ITEMS;
      }
   });
  }

  ngOnDestroy() {
    
  }
}

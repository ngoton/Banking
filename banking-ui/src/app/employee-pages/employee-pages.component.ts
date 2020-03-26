import { Component, OnInit, OnDestroy } from '@angular/core';
import { MENU_ITEMS, MENU_ADMIN_ITEMS } from './employee-pages-menu';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-employee-pages',
  templateUrl: './employee-pages.component.html',
  styleUrls: ['./employee-pages.component.scss']
})
export class EmployeePagesComponent implements OnInit, OnDestroy {

  role: string;
  menu: NbMenuItem[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      if(params['role'] != null){
        this.role = params['role'];
      }
      else{
        const userInfo = JSON.parse(localStorage.getItem('userDetails'));
        this.role = userInfo.role;
      }

      if(this.role == 'ADMIN'){
        this.menu = MENU_ADMIN_ITEMS;
        this.router.navigate(['employee/employee-manager']);
      }
      if(this.role == 'STAFF'){
        this.menu = MENU_ITEMS;
        this.router.navigate(['employee/accounts']);
      }
   });
  }

  ngOnDestroy() {
    
  }
}

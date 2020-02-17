import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './employee-pages-menu';

@Component({
  selector: 'ngx-employee-pages',
  templateUrl: './employee-pages.component.html',
  styleUrls: ['./employee-pages.component.scss']
})
export class EmployeePagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit() {
  }

}

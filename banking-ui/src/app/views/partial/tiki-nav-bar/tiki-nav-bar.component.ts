import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { navTikiItems } from '../../../_nav';

@Component({
  selector: 'app-tiki-nav-bar',
  templateUrl: './tiki-nav-bar.component.html',
  styleUrls: ['./tiki-nav-bar.component.scss']
})
export class TikiNavBarComponent implements OnInit {
  navigations: INavData[];

  constructor() {
    // Get default navigation
    this.navigations = navTikiItems;
   }

  ngOnInit() {
  }
}

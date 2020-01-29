import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-remider-detail',
  templateUrl: './remider-detail.component.html',
  styleUrls: ['./remider-detail.component.scss']
})
export class RemiderDetailComponent implements OnInit {

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;

  constructor() { }

  ngOnInit() {
  }

}

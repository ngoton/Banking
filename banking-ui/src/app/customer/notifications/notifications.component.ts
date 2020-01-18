import { Component, OnInit } from '@angular/core';
import { FreqBeneficiaries } from '../_customer-model/customer.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public freqBeneficiaries: Array<FreqBeneficiaries>;
  config: any;

  constructor() { }

  ngOnInit() {
  }

  toggleChat() {
    console.log('me');
  }

  toggleInnerChat() { console.log('me'); }


}

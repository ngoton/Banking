import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  frequentBills: FrequentBills[] = [];
  errorMessage: any;
  constructor() { }

  ngOnInit() {
  }

}
export interface FrequentBills {
  customerId: string;
  customerShowName: string;
  customerName: string;
  customerAccountNumber: string;
  formId: string;
}
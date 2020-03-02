import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';
import { Debits } from '../../_models/customer.model';

@Component({
  selector: 'ngx-reminder-debt',
  templateUrl: './reminder-debt.component.html',
  styleUrls: ['./reminder-debt.component.scss']
})
export class ReminderDebtComponent implements OnInit {
  
  constructor(private customerService: CustomerService) {
    this.customerService.getAcctDetailsData();
  }

  ngOnInit() {
  }

}

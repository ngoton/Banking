import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CustomerService } from '../_customer-service/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Beneficiarys } from '../_customer-model/customer.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TransferComponent implements OnInit, OnDestroy {
  more = false;

  constructor(private customerService: CustomerService) {
    // this.customerService.getPreRegBeneficiariesData();
    // this.customerService.getBeneficiariesData('GTBankThirdParty');
    // this.customerService.getBanksData();
  }

  ngOnInit() {
    // this.customerService.preRegBeneficiaries$.subscribe();
    // this.customerService.beneficiaries$.subscribe();
    // this.customerService.banks$.subscribe();
  }

  ngOnDestroy(): void {

  }

  toggleMenu() {
    this.more = !this.more;
  }

}

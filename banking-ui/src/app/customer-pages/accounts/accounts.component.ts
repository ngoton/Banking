import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, takeUntil } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { AccountsService } from './accounts.service';
import { Customers, Savings, Credits, Debits, Payment } from '../../_models/customer.model';
import { CustomerService } from '../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PaymentService } from '../../_services/payment.service';
import { SavingService } from '../../_services/saving.service';
import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-accounts',
  styleUrls: ['./accounts.component.scss'],
  templateUrl: './accounts.component.html',
})
export class AccountsComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-checkmark-circle',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  customerInfor: Customers;
  saving: Savings;
  payment: Payment;

  constructor(private themeService: NbThemeService,
              private accountsService: AccountsService,
              private solarService: SolarData,
              private paymentService: PaymentService,
              private savingService: SavingService,
              private decimalPipe: DecimalPipe) {
    this.saving = new Savings();
    this.payment = new Payment();

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    // Subscribe to user Details from UserService
    setTimeout(() => {
      this.accountsService.acctDetail$
        .pipe(untilDestroyed(this))
        .subscribe((response: Customers) => {
          this.customerInfor = response;
          this.getPayment(this.customerInfor.customerId);
          this.getSaving(this.customerInfor.customerId);
        });
    }, 2000);


    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  getPayment(customerId){
    this.paymentService.getPaymentsByCustomerId(customerId)
    .pipe(untilDestroyed(this))
    .subscribe(
      (payment: Payment[]) => {
        this.payment = payment[0];
        this.payment.balance = this.decimalPipe.transform(this.payment.balance, '1.3-3');
      },
      (err: HttpErrorResponse)=> {

      }
    );
  }

  getSaving(customerId){
    this.savingService.getSavingsByCustomerId(customerId)
    .pipe(untilDestroyed(this))
    .subscribe(
      (saving: Savings[]) => {
        this.saving = saving[0];
        this.saving.balance = this.decimalPipe.transform(this.saving.balance, '1.3-3');
      },
      (err: HttpErrorResponse)=> {

      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

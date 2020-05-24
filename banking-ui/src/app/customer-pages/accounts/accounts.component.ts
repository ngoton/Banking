import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
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
import { NotifierService } from 'angular-notifier';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-accounts",
  styleUrls: ["./accounts.component.scss"],
  templateUrl: "./accounts.component.html",
  encapsulation: ViewEncapsulation.None
})
export class AccountsComponent implements OnDestroy {
  private alive = true;
  loadingAccount = false;

  solarValue: number;
  lightCard: CardSettings = {
    title: "Light",
    iconClass: "nb-checkmark-circle",
    type: "primary"
  };
  rollerShadesCard: CardSettings = {
    title: "Roller Shades",
    iconClass: "nb-roller-shades",
    type: "success"
  };
  wirelessAudioCard: CardSettings = {
    title: "Wireless Audio",
    iconClass: "nb-audio",
    type: "info"
  };
  coffeeMakerCard: CardSettings = {
    title: "Coffee Maker",
    iconClass: "nb-coffee-maker",
    type: "warning"
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard
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
        type: "warning"
      },
      {
        ...this.rollerShadesCard,
        type: "primary"
      },
      {
        ...this.wirelessAudioCard,
        type: "danger"
      },
      {
        ...this.coffeeMakerCard,
        type: "info"
      }
    ],
    dark: this.commonStatusCardsSet
  };

  customerInfor: Customers;
  saving: any;
  payment: any;
  private readonly notifier: NotifierService;

  constructor(
    private themeService: NbThemeService,
    private accountsService: AccountsService,
    private paymentService: PaymentService,
    private savingService: SavingService,
    private solarService: SolarData,
    private customerService: CustomerService,
    private decimalPipe: DecimalPipe,
    private notificationService: NotifierService
  ) {
    this.saving = new Savings();
    this.payment = new Payment();
    this.notifier = notificationService;

    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    // Subscribe to user Details from UserService
    setTimeout(() => {
      this.loadingAccount = true;
      this.customerService.getPaymentAndSavingInfor()
        .pipe(untilDestroyed(this))
        .subscribe(([payments, savings]) => {
          this.loadingAccount = false;
          
          if(payments.length != 0){
            this.payment = new Payment(payments[0]);
            //this.payment.status = payments[0].status == 1 ? true : false;
            this.payment.balance = this.decimalPipe.transform(
              this.payment.balance,
              "1.0-3"
            );
          }
          else{
            this.payment = new Payment();
          }

          if(savings.length != 0){
            this.saving = new Savings(savings[0]);
            //this.payment.status = savings[0].status == 1 ? true : false;
            this.saving.balance = this.decimalPipe.transform(
              this.saving.balance,
              "1.0-3"
            );
          }
          else{
            this.saving = new Savings();
          }
          
          
        }, (err: any) => {
          this.loadingAccount = false;
        });
    }, 2000);

    this.solarService
      .getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => {
        this.solarValue = data;
      });
  }

  updateStatusAccount() {
    this.loadingAccount = true;
    this.paymentService.updateStateAccount(this.payment.account, this.payment.status)
    .pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.loadingAccount = false;
        this.notifier.show({
          type: "success",
          message: "Cập nhật thành công!",
          id: "success-status"
        });
      },
      (error: HttpErrorResponse) => {
        this.loadingAccount = false;
        this.notifier.show({
          type: "error",
          message: `Cập nhật không thành công! ${error}`,
          id: "error-status"
        });
      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

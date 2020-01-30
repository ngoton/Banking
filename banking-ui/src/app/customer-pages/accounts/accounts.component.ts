import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile, takeUntil } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { AccountsService } from './accounts.service';
import { Customers, Savings, Credits, Debits } from '../../_models/customer.model';
import { CustomerService } from '../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
  credit: Credits;
  debit: Debits;

  constructor(private themeService: NbThemeService,
              private accountsService: AccountsService,
              private solarService: SolarData) {
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
          debugger;
          this.customerInfor = response;
          this.saving = this.customerInfor.saving;
          this.credit = this.customerInfor.credit;
          this.debit = this.customerInfor.debit;
        });
    }, 5000);


    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

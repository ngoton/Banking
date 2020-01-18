import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Category,
  Biller,
  Product,
  FormFields,
  CategoryIcons,
  ValidationDetails,
  Collections,
  DropDownDetails
} from '../_model/bills-payment.model';

@Injectable({
  providedIn: 'root'
})
export class BillsPaymentService implements OnDestroy {
  dropdownList: DropDownDetails[] = [];
  imgUrl = 'assets/icon/smashicons/bills-payment/';
  categoryIcons: CategoryIcons = {
    SchoolsProfessionalBodies: `${this.imgUrl}schools-3.svg`,
    VISAFeePayment: `${this.imgUrl}visa.svg`,
    DistributorPayments: `${this.imgUrl}distributors.svg`,
    Others: `${this.imgUrl}more.svg`,
    InsuranceHealthPlan: `${this.imgUrl}insurance.svg`,
    AirtimeData: `${this.imgUrl}airtime-data.svg`,
    ReligiousDonations: `${this.imgUrl}religious-donations.svg`,
    ShippingLinePayment: `${this.imgUrl}shipping.svg`,
    CapitalMarketInvestments: `${this.imgUrl}investments.svg`,
    ElectricityWater: `${this.imgUrl}electricity-2.svg`,
    GovernmentTaxesandLevies: `${this.imgUrl}tax.svg`,
    TravelsTransportation: `${this.imgUrl}travel.svg`,
    EventsandTicketing: `${this.imgUrl}events-2.svg`,
    FinancialInstitutions: `${this.imgUrl}bank.svg`,
    SportsandGaming: `${this.imgUrl}sports-games.svg`,
    CableTV: `${this.imgUrl}tv-subscription.svg`,
    TollFeesLCC: `${this.imgUrl}tv-subscription.svg`,
    Remita: `${this.imgUrl}tv-subscription.svg`,
    HotelsEstatesAssociations: `${this.imgUrl}hotels.svg`
    // tslint:disable-next-line:semicolon
  };
  constructor() { }
  ngOnDestroy(){}
}

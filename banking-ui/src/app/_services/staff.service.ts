import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, from, forkJoin, combineLatest } from 'rxjs';
import { retry, catchError, flatMap, finalize, map, mergeMap } from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';
import {
  Beneficiarys,
  Banks,
  Customers,
  Payment,
  Savings,
  Debits,
  Credits
} from '../_models/customer.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from './auth.service';
import { PaymentService } from './payment.service';
import { SavingService } from './saving.service';
import { BenificiaryService } from './benificiary.service';
import { DebitService } from './debit.service';
import { CreditService } from './credit.service';
import { PaymentTransactionService } from './payment-transaction.service';
import { SavingTransactionService } from './saving-transaction.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService implements OnDestroy {

  private STAFF_URL = environment.BASE_URL + environment.STAFF_SERV;
  private ACC_URL = environment.BASE_URL + environment.ACC_SERV;

  private accountCredits = [];

  // Observable string sources: Account Details
  private acctDetailSource = new BehaviorSubject<Customers>(null);
  acctDetail$ = this.acctDetailSource.asObservable();
  private acctDetailErrorSource = new BehaviorSubject<string>(null);
  acctDetailError$ = this.acctDetailErrorSource.asObservable();
  // End Observable string streams: Account Details

  // Observable string sources: payments
  private paymentsSource = new BehaviorSubject<any>(null);
  private paymentsErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: payments
  payments$ = this.paymentsSource.asObservable();
  paymentError$ = this.paymentsErrorSource.asObservable();

  // Observable string sources: savings
  private savingsSource = new BehaviorSubject<any>(null);
  private savingsErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: savings
  savings$ = this.savingsSource.asObservable();
  savingsError$ = this.savingsErrorSource.asObservable();

  // Observable string sources: Pre registered Beneficiaries
  private beneficiaries = new BehaviorSubject<Beneficiarys[]>(null);
  beneficiaries$ = this.beneficiaries.asObservable();
  private selectedBeneficiary = new BehaviorSubject<Beneficiarys>(null);
  selectedBeneficiaries$ = this.selectedBeneficiary.asObservable();
  private beneficiariesError = new BehaviorSubject<string>('Empty');
  beneficiariesError$ = this.beneficiariesError.asObservable();
  // Observable string sources: Pre registered Beneficiaries

  // Observable string sources: debit
  private debits = new BehaviorSubject<Debits[]>([]);
  private debitsError = new BehaviorSubject<any>(null);
  // Observable string streams: debit
  debits$ = this.debits.asObservable();
  debitsError$ = this.debitsError.asObservable();

  // Observable string sources: credit
  private credits = new BehaviorSubject<Credits[]>([]);
  private creditsError = new BehaviorSubject<any>(null);
  // Observable string streams: credit
  credits$ = this.credits.asObservable();
  creditsError$ = this.creditsError.asObservable();

  // Observable string sources: account credit
  private accountCreditsSource = new BehaviorSubject<any[]>([]);
  private accountCreditsError = new BehaviorSubject<any>(null);
  // Observable string streams: account credit
  accountCredits$ = this.accountCreditsSource.asObservable();
  accountCreditsError$ = this.accountCreditsError.asObservable();

  // Observable string sources: Banks
  private banks = new BehaviorSubject<Banks[]>(null);
  banks$ = this.banks.asObservable();
  private selectedBank = new BehaviorSubject<Banks>(null);
  selectedBank$ = this.selectedBank.asObservable();
  private banksError = new BehaviorSubject<string>('Empty');
  banksError$ = this.banksError.asObservable();
  // End Observable string sources: Banks

  // Branches, You can subscribe to this Observable for a list of Bank Branches
  private branchesSource = new Subject<any[]>();
  branchesObserver = this.branchesSource.asObservable();

  private subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private paymentService: PaymentService,
    private savingService: SavingService,
    private paymentTranService: PaymentTransactionService,
    private savingTranService: SavingTransactionService,
    private benificiaryService: BenificiaryService,
    private debitService: DebitService,
    private creditService: CreditService
  ) { }

  all(): Observable<any> {
    const PATH = this.STAFF_URL;

    return this.http.get<any>(PATH).pipe();
  }

  single(staffId): Observable<any> {
    const PATH = this.STAFF_URL + `/${staffId}`;

    return this.http.get<any>(PATH).pipe();
  }

  add(data): Observable<any> {
    const body = {
      code: data.code,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      email: data.email
    }

    const PATH = this.STAFF_URL;

    return this.http.post<any>(PATH, JSON.stringify(body)).pipe();
  }

  update(data): Observable<any> {
    const body = {
      code: data.code,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      email: data.email
    }

    const PATH = this.STAFF_URL;

    return this.http.put<any>(PATH, JSON.stringify(body)).pipe();
  }

  delete(id): Observable<any> {
    const PATH = this.STAFF_URL + `/${id}`;

    return this.http.delete<any>(PATH).pipe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

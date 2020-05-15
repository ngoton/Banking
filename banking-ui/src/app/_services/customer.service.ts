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
export class CustomerService implements OnDestroy {

  private CUST_URL = environment.BASE_URL + environment.CUST_SERV;
  private REQ_URL = environment.BASE_URL + environment.REQ_SERV;

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
    private util: UtilitiesService,
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

  // Http Headers
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${this.auth.getToken()}`
  //   }),
  // };

  getCustomerData(): Observable<any> {
    const userDetails = this.userService.getUserDetails();
    const userId = userDetails.userId;
    let accessToken = this.auth.getToken();

    if(accessToken){

      const PATH = this.CUST_URL + `/user/${userId}`;
      return this.http.get<any>(PATH)
      .pipe(
        //retry(3),
        //catchError(this.util.handleError)
      );
    }
    else{
      this.router.navigate(['/onboarding/login']);
    }
  }

  getByPaymentAccount(account): Observable<any> {
    const PATH = this.CUST_URL + `/payment/${account}`;

    return this.http.get<any>(PATH).pipe(
      //retry(3)
    );
  }

  getAccountInfo(account, bankName): Observable<any> {
    const PATH = this.ACC_URL + `?account=${account}&bankName=${bankName}`;

    return this.http.get<any>(PATH).pipe(
      //retry(3)
    );
  }

  getAcctDetailsData() {
    this.getCustomerData().pipe(untilDestroyed(this))
      .subscribe(
        (customerRes: Customers) => {
          if (customerRes) {
            this.updateAcctDetailsError('');
            this.updateAcctDetails(customerRes);
            localStorage.setItem("customerInfor", JSON.stringify(customerRes));
          } else {
            this.updateAcctDetailsError("Can't get customer's data");
            this.updateAcctDetails(null);
          }


        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.updateAcctDetailsError(`Oops! We couldn't reach this service at this time. Try again`);
          this.updateAcctDetails(null);
        }
      );

  }

  getPaymentsData() {
    this.getCustomerData().pipe(untilDestroyed(this),
      flatMap(
        customer => {
          return this.paymentService.getPaymentsByCustomerId(customer.customerId);
        }
      ),
      finalize(() => {

      })
    ).subscribe(
      (payments: Payment[]) => {
        let payment = new Payment(payments[0]);
        this.updatePayment(payment);
      },
      (err: HttpErrorResponse)=> {
        
      }
    );
  }

  updatePayment(payments) {
    this.paymentsSource.next(payments);
  }

  updatePaymentError(error) {
    this.paymentsErrorSource.next(error);
  }

  public getSavingsData() {
    this.getCustomerData().pipe(untilDestroyed(this),
      flatMap(
        customer => {
          return this.savingService.getSavingsByCustomerId(customer.customerId);
        }
      ),
      finalize(() => {

      })
    ).subscribe(
      (savings: Savings[]) => {
        let saving = new Savings(savings[0]);
        this.updateSaving(saving);
      },
      (err: HttpErrorResponse)=> {
        
      }
    );
  }
  
  updateSaving(savings) {
    this.savingsSource.next(savings);
  }

  updateSavingError(error) {
    this.savingsSource.next(error);
  }

  updateAcctDetails(accts) {
    this.acctDetailSource.next(accts);
  }

  updateAcctDetailsError(message) {
    this.acctDetailErrorSource.next(message);
  }

  getPaymentAndSavingInfor() {
    const customer = JSON.parse(localStorage.getItem("customerInfor"));

    const payments = this.paymentService.getPaymentsByCustomerId(customer.customerId);
    const savings = this.savingService.getSavingsByCustomerId(customer.customerId);

    return forkJoin([payments, savings]).pipe();
  }


  getPaymentAndSavingReceive() {
    const customer = JSON.parse(localStorage.getItem("customerInfor"));

    const payments = this.paymentTranService.getPaymentReceiveByCustomer(customer.customerId);
    const savings = this.savingTranService.getSavingReceiveByCustomer(customer.customerId);

    return forkJoin([payments, savings]).pipe();
  }

  public getBeneficiariesData() {
    this.getCustomerData().pipe(untilDestroyed(this)).subscribe(
      (customerResponse: any) => {
        this.benificiaryService.getByCustomerCode(customerResponse.code).pipe(untilDestroyed(this))
        .subscribe(
          (beneficiariesResponse: any[]) => {
            this.updateBeneficiariesError('');
            this.updateBeneficiaries(beneficiariesResponse);
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.updateBeneficiariesError(err);
          }
        );
      }
    );
  }

  updateBeneficiaries(newBeneficiaries) {
    this.beneficiaries.next(newBeneficiaries);
  }

  updateSelectedBeneficiaries(newBeneficiaries) {
    this.selectedBeneficiary.next(newBeneficiaries);
  }

  updateBeneficiariesError(message) {
    this.beneficiariesError.next(message);
  }

  public getDebitsData() {
    debugger;
    var subscription = this.getCustomerData().pipe(untilDestroyed(this)).subscribe(
      (customerResponse: any) => {
        this.debitService.getByCustomerId(customerResponse.customerId)
        .pipe(untilDestroyed(this))
        .subscribe(
          (response: any) => {
            this.updateDebit(response.content);
          },
          (err: HttpErrorResponse)=> {
            
          }
        );
      }
    );

  }

  updateDebit(debits) {
    this.debits.next(debits);
  }

  updateDebitError(error) {
    this.debitsError.next(error);
  }

  clearDebit() {
    this.debits.next([]);
  }

  public getCreditsData() {
    this.getCustomerData().pipe(untilDestroyed(this)).subscribe(
      (customerResponse: any) => {
        this.creditService.getByCustomerId(customerResponse.customerId)
        .pipe(untilDestroyed(this))
        .subscribe(
          (response: any) => {
            this.updateCredit(response.content);
          },
          (err: HttpErrorResponse)=> {
            
          }
        );
      }
    );
  }

  updateCredit(credits) {
    this.credits.next(credits);
  }

  updateCreditError(error) {
    this.creditsError.next(error);
  }

  clearCredit() {
    this.credits.next([]);
  }

  getAccountCredit(credits) {
    from(credits).pipe(
      flatMap(
        (credit: any) => {
          return this.getAccountInfo(credit.account, "HCB_BANK");
        }
      ),
      finalize(() => {
      })
    ).subscribe(
      account => {
        this.accountCredits.push(account);
      }
    );
  }

  updateAccountCredit() {
    this.accountCreditsSource.next(this.accountCredits);
  }

  updateAccountCreditError(error) {
    this.accountCreditsError.next(error);
  }

  All(): Observable<any> {
    const PATH = this.CUST_URL;

    return this.http.get<any>(PATH)
    .pipe();
  }

  Add(customer): Observable<any> {
    const body = {
      code: customer.code,
      firstName: customer.firstName,
      lastName: customer.lastName,
      birthDate: customer.birthDate,
      gender: customer.gender,
      phone: customer.phone,
      address: customer.address,
      email: customer.email
    }

    const PATH = this.CUST_URL;

    return this.http.post<any>(PATH, JSON.stringify(body))
    .pipe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

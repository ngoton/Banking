import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';
import {
  Beneficiarys,
  Banks,
  Customers,
  Payment,
  Savings
} from '../_models/customer.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthService } from './auth.service';
import { PaymentService } from './payment.service';
import { SavingService } from './saving.service';
import { BenificiaryService } from './benificiary.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService implements OnDestroy {

  private CUST_URL = environment.BASE_URL + environment.CUST_SERV;
  private REQ_URL = environment.BASE_URL + environment.REQ_SERV;

  // Observable string sources: Account Details
  private acctDetailSource = new BehaviorSubject<Customers>(null);
  acctDetail$ = this.acctDetailSource.asObservable();
  private acctDetailErrorSource = new BehaviorSubject<string>(null);
  acctDetailError$ = this.acctDetailErrorSource.asObservable();
  // End Observable string streams: Account Details

  // Observable string sources: user
  private paymentsSource = new BehaviorSubject<any>(null);
  private paymentsErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: user
  payments$ = this.paymentsSource.asObservable();
  paymentError$ = this.paymentsErrorSource.asObservable();

  // Observable string sources: user
  private savingsSource = new BehaviorSubject<any>(null);
  private savingsErrorSource = new BehaviorSubject<any>(null);
  // Observable string streams: user
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
    private benificiaryService: BenificiaryService
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
        retry(3),
        //catchError(this.util.handleError)
      );
    }
    else{
      this.router.navigate(['/onboarding/login']);
    }
  }

  findCustomerByAccount(account) {
    
  }

  getAcctDetailsData() {
    this.getCustomerData().pipe(untilDestroyed(this))
      .subscribe(
        (customerRes: Customers) => {
          if (customerRes) {
            this.updateAcctDetailsError('');
            this.updateAcctDetails(customerRes);
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

  public getPaymentsData() {
    this.getCustomerData().pipe(untilDestroyed(this)).subscribe(
      (customerResponse: any) => {
        this.paymentService.getPaymentsByCustomerId(customerResponse.customerId)
        .pipe(untilDestroyed(this))
        .subscribe(
          (payments: Payment[]) => {
            this.updatePayment(payments[0]);
          },
          (err: HttpErrorResponse)=> {
            
          }
        );
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
    this.getCustomerData().pipe(untilDestroyed(this)).subscribe(
      (customerResponse: any) => {
        this.savingService.getSavingsByCustomerId(customerResponse.customerId)
        .pipe(untilDestroyed(this))
        .subscribe(
          (savings: Savings[]) => {
            this.updateSaving(savings[0]);
          },
          (err: HttpErrorResponse)=> {
            
          }
        );
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

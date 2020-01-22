import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';
import {
  Beneficiarys,
  Banks,
  Customers
} from '../_models/customer.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Injectable({
  providedIn: 'root'
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

  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private util: UtilitiesService,
    private router: Router,
    private userService: UserService,
  ) { }


  // =================== BALANCE ENQUIRY =======================
  customerValidationUpdated(body): Observable<any> {
    const PATH = this.CUST_URL + `/CustomerValidationMoreRecord`;
    // Add customer related properties to the body object
    const cusNum = body.customerNumber;
    body = this.util.addAuthParams(body);
    delete body.customerID;
    body.customerNumber = cusNum;
    console.log(body); // for debugging only
    return this.http.post<Response>(PATH, body)
      .pipe(
        retry(3),
        catchError(this.util.handleError)
      );
  }

  getAcctDetailsData() {
    const userDetails = this.userService.getUserDetails();

    const body = {
      'email': '',
      'phoneNumber': '',
      'bvn': '',
      'category': 1,
      'customerNumber': !userDetails ? '' : userDetails.id
    };

    const customerInformation = userDetails.customer;
    this.updateAcctDetails(customerInformation);
    // this.customerValidationUpdated(body).pipe(untilDestroyed(this))
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //       console.log(res.accountDetails);
    //       if (res.responseCode === '00') {
    //         this.updateAcctDetailsError('');
    //         this.updateAcctDetails(res.accountDetails);
    //         this.updateSelectedAcctDetails(res.accountDetails[0]);
    //       } else {
    //         this.updateAcctDetailsError(res.responseDescription);
    //         this.updateAcctDetails(null);
    //         this.updateSelectedAcctDetails(null);
    //         // alert('An Error Occured' + res.responseDescription);
    //       }
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log(err);
    //       this.updateAcctDetailsError(`Oops! We couldn't reach this service at this time. Try again`);
    //       this.updateAcctDetails(null);
    //       this.updateSelectedAcctDetails(null);
    //     }
    //   );

  }

  updateAcctDetails(accts) {
    this.acctDetailSource.next(accts);
  }

  updateAcctDetailsError(message) {
    this.acctDetailErrorSource.next(message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

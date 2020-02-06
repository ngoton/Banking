import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription, from } from 'rxjs';
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
import { AuthService } from './auth.service';

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

  private subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private util: UtilitiesService,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  // Http Headers
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${this.auth.getToken()}`
  //   }),
  // };

  getCustomerData(userId): Observable<any> {
    let accessToken = this.auth.getToken();

    if(accessToken){

      const PATH = this.CUST_URL + `/user/${userId}`;
      return this.http.get<any>(PATH)
      .pipe(
        retry(3),
        catchError(this.util.handleError)
      );
    }
    else{
      this.router.navigate(['/onboarding/login']);
    }
  }

  getAcctDetailsData() {
    const userDetails = this.userService.getUserDetails();

    this.getCustomerData(userDetails.userId).pipe(untilDestroyed(this))
      .subscribe(
        (res: Customers) => {
          // console.log(res.accountDetails);
          if (res) {
            this.updateAcctDetailsError('');
            this.updateAcctDetails(res);
          } else {
            this.updateAcctDetailsError("Can't get customer's data");
            this.updateAcctDetails(null);
            // alert('An Error Occured' + res.responseDescription);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.updateAcctDetailsError(`Oops! We couldn't reach this service at this time. Try again`);
          this.updateAcctDetails(null);
        }
      );

  }

  updateAcctDetails(accts) {
    this.acctDetailSource.next(accts);
  }

  updateAcctDetailsError(message) {
    this.acctDetailErrorSource.next(message);
  }

  // Query funtion that returns beneficiaries from the API.
  // getBeneficiaries(type): Observable<any> {
  //   const PATH = this.CUST_URL + `/GetBeneficiaryList`;
  //   const user = this.userService.getUserDetails();
  //   console.log(user);

  //   if (user) {
  //     let body = {
  //       'transactionType': type,
  //     };
  //     body = this.util.addAuthParams(body);
  //     console.log(body); // for debugging only
  //     return this.http.post<Response>(PATH, body)
  //       .pipe(
  //         retry(3),
  //         catchError(this.util.handleError)
  //       );
  //   } else {
  //     this.router.navigate(['/onboarding/login']);
  //     alert('Your session has expired');
  //   }

  // }

  public getBeneficiariesData() {
    let beneficiaries = [
      {
        id: 1,
        name: "Nguyễn Quang Phát",
        short_name: "NQP",
        account: "219840928320941",
        bank_name: "IBank",
        customer_id: 14824050
      },
      {
        id: 2,
        name: "Hồng Kim Ngân",
        short_name: "Ngân Hồng",
        account: "4092380985358204",
        bank_name: "Sacombank",
        customer_id: 14824050
      },
      {
        id: 3,
        name: "Lê Minh Quân",
        short_name: "Minh Quân",
        account: "3984902834091823",
        bank_name: "Vietcombank",
        customer_id: 14824050
      },
      {
        id: 4,
        name: "Hồ Thị Thu Thảo",
        short_name: "HTTT",
        account: "23049203490394934",
        bank_name: "Techcombank",
        customer_id: 14824050
      },
      {
        id: 5,
        name: "Nguyễn Bá Đạt",
        short_name: "Đạt Bá",
        account: "29481948140912834",
        bank_name: "VBBank",
        customer_id: 14824050
      }
    ];

    this.updateBeneficiaries(beneficiaries);

    // this.getBeneficiaries(type).pipe(untilDestroyed(this))
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res); // Delete later
    //       if (res.responseCode === '00') {
    //         this.updateBeneficiariesError('');
    //         this.updateBeneficiaries(res.beneficiaries);
    //       } else {
    //         this.updateBeneficiariesError(res.responseDescription);
    //       }
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log(err);
    //       this.updateBeneficiariesError(err);
    //     }
    //   );
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

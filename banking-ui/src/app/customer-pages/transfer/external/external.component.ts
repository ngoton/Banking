import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Payment, Savings, Customers, Beneficiarys, Partners, PaymentTransactions } from '../../../_models/customer.model';
import { DecimalPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { PartnerService } from '../../../_services/partner.service';
import { NotifierService } from 'angular-notifier';
import { NbDialogService } from '@nebular/theme';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, flatMap } from 'rxjs/operators';
import { PaymentService } from '../../../_services/payment.service';
import { BenificiaryService } from '../../../_services/benificiary.service';

@Component({
  selector: 'ngx-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExternalComponent implements OnInit, OnDestroy {
  loading = false;
  finished = false;
  private readonly notifier: NotifierService;
  private destroy$: Subject<void> = new Subject<void>();
  
  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  accounts: any[] = new Array();
  selectedPartner: Partners = new Partners();
  partners: Partners[] = new Array();
  benificiary: Beneficiarys[] = new Array();
  selectedBenificiary: Beneficiarys = new Beneficiarys();

  paymentTransaction: PaymentTransactions = new PaymentTransactions();

  constructor(private customerService: CustomerService,
              private paymentService: PaymentService,
              private benificiaryService: BenificiaryService,
              private partnerService: PartnerService,
              private decimalPipe: DecimalPipe,
              private dialogService: NbDialogService,
              private paymentTransactionService: PaymentTransactionService,
              private notifications: NotifierService,
              private router: Router) {
                this.notifier = notifications;
                this.selectedBenificiary = new Beneficiarys();
  }

  ngOnInit() {
    this.loading = true;
    this.partnerService.getAll().pipe(untilDestroyed(this),
      flatMap(
        (partners: Partners[]) => {
          this.partners = partners;

          let customerInfor = JSON.parse(localStorage.getItem('customerInfor'));
          if(customerInfor != null){
            return forkJoin([this.paymentService.getPaymentsByCustomerId(customerInfor.customerId)
                            , this.benificiaryService.getByCustomerCode(customerInfor.code)]);
          }
          else
            this.router.navigate(['onboarding/login']);
        }
      )
    ).subscribe(
        ([payment, benificiaries]) => {
          this.loading = false;
          this.accounts.push(payment[0]);
          this.benificiary = benificiaries.filter(b => b.bankName != environment.BANK_NAME);
        }
      );
  }

  accountInforChanged(){
    this.loading = true;
    if(this.paymentTransaction.beneficiaryAccount != null && this.selectedPartner.name != ""){
      this.customerService.getAccountInfo(this.paymentTransaction.beneficiaryAccount, this.selectedPartner.name)
      .pipe(untilDestroyed(this)).subscribe(
        (accountInfor : any) => {
          this.loading = false;
          if(accountInfor.name!= ""){
            let benificiary = new Beneficiarys();
            benificiary.name = accountInfor.name;
            benificiary.account = accountInfor.account;
            benificiary.bankName = accountInfor.bankName;

            this.selectedBenificiary = benificiary;
          }
          else{
            this.notifier.show({
              type: "error",
              message: "Tài khoản này không đủ thông tin!",
              id: "wrong-content" // this is optional
            });
          }

          
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notifier.show({
            type: "error",
            message: "Không tìm thấy thông tin tài khoản!",
            id: "not-found" // this is optional
          });
        }
      );
    }
    else{
      this.loading = false;
    }
    
  }


  onSubmit() {
    this.loading = true;
    this.paymentTransactionService.externalPayment(this.paymentTransaction, this.selectedBenificiary)
    .pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.loading = false;
        this.dialogService.open(DialogOTPPromptComponent, { 
          context: {
            paymentInfor: response
          } 
        }).onClose.subscribe((code: string ) => {
          if(code){
            this.finished = true;
            this.notifier.show({
              type: "success",
              message: "Chuyển tiền thành công!",
              id: "verify-success" // Again, this is optional
            });
          }
        });
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  benificiaryChange(item: Beneficiarys) {
    this.selectedPartner = this.partners.find(x => x.name === item.bankName);
    this.selectedBenificiary = item;
    this.paymentTransaction.beneficiarysId = item.id;
    this.paymentTransaction.beneficiaryAccount = item.account;
    this.customerService.updateSelectedBeneficiaries(item);
  }

  paymentChange(item: any){
    this.paymentTransaction.paymentsId = item && item.id || item && item.paymentId;
  }

  goHome() {
    this.router.navigate(['customer/accounts']);
  }

  partnerChange(item) {
    this.selectedPartner = item;
    this.accountInforChanged();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { CustomerService } from '../../../_services/customer.service';
import { Customers, Debits, Payment, Credits, PaymentTransactions, Beneficiarys } from '../../../_models/customer.model';
import { DialogDimissPromptComponent } from '../dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreditService } from '../../../_services/credit.service';
import { DebitService } from '../../../_services/debit.service';
import { NotifierService } from 'angular-notifier';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';

@Component({
  selector: "ngx-remider-list",
  templateUrl: "./remider-list.component.html",
  styleUrls: ["./remider-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RemiderListComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private readonly notifi: NotifierService;

  private subscription: Subscription = new Subscription();

  loadingList: boolean = false;

  customer: Customers = new Customers();
  payment: Payment = new Payment();
  debits: Debits[] = new Array();
  credits: Credits[] = new Array();
  debitsData: debitData[] = new Array();
  creditData: debitData[] = new Array();

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      name_reminder: {
        title: "Người gửi",
        type: "string"
      },
      account_reminder: {
        title: "Tài khoản gửi",
        type: "string"
      },
      account: {
        title: "Tài khoản nợ",
        type: "string"
      },
      money: {
        title: "Số tiền (VNĐ)",
        type: "string"
      },
      content: {
        title: "Nội dung",
        type: "string"
      },
      status: {
        title: "Tình trạng",
        type: "string"
      }
    },
    actions: {
      columnTitle: "Thao tác",
      add: false,
      edit: false,
      delete: true,
      custom: [
        { name: "pay", title: '<i class="nb-checkmark" ngIf=""></i>' }
      ]
      //   custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ],
      //   position: 'right'
    },
    rowClassFunction: row => {
      var curPaymentAccount = localStorage.getItem("paymentAccount");
      if (curPaymentAccount != null && curPaymentAccount != ""){
        if(row.data.type == 'debit'){
          return "hide-custom-action"; //Ẩn nút Thanh toán nợ
        }
        if(row.data.type == 'credit'){
          return "show-all" //Hiện cả nút Thanh toán và Hủy
        }
      }
      return "hide-all";
    },
    attr: {
      class: "table table-bordered"
    },
    hideSubHeader: true
  };

  status = { 0: "Chưa thanh toán", 1: "Đã thanh toán" };
  source: LocalDataSource = new LocalDataSource();
  content_dimiss: string;

  constructor(
    private customerService: CustomerService,
    private dialogService: NbDialogService,
    private debitService: DebitService,
    private creditService: CreditService,
    private notifications: NotifierService,
    private paymentTransactionService: PaymentTransactionService
  ) {
    this.notifi = notifications;

    this.getPayment();
  }

  onCustomAction(event) {
    debugger;
    switch (event.action) {
      case "pay":
        this.payCredit(event.data);
        break;
    }
  }

  payCredit(data) {
    this.creditService.pay(data.id, data)
    .pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.dialogService.open(DialogOTPPromptComponent, { 
          context: {
            paymentInfor: success,
          } 
        }).onClose.subscribe(
          (code: string ) => {
            if(code){
              this.notifi.show({
                id: `paied`,
                message: `Thanh toán nợ thành công`,
                type: `info`,
                template: this.customNotificationTmpl
              });

              this.source.refresh();
            }
          },
          (err: any) => {
            this.notifi.show({
              id: `payError`,
              message: `Không thể thanh toán nợ`,
              type: `error`,
              template: this.customNotificationTmpl
            });
          }
        );
      },
      (err: HttpErrorResponse) => {
        this.notifi.show({
          id: `payError`,
          message: `Không thể thanh toán nợ`,
          type: `error`,
          template: this.customNotificationTmpl
        });
      }
    );
  }

  getPayment() {
    this.loadingList = true;
    var subscription = this.customerService.payments$
      .pipe(untilDestroyed(this))
      .subscribe(
        (payment: Payment) => {
          this.loadingList = false;
          this.payment = new Payment(payment);
          localStorage.setItem("paymentAccount", this.payment.account);

          this.getDebits();
          this.getCredits();
        },
        (err: any) => {
          this.loadingList = false;
        }
      );
    this.subscription.add(subscription);
  }

  getDebits() {
    this.loadingList = true;
    var subscription = this.customerService.debits$
      .pipe(untilDestroyed(this))
      .subscribe(
        (debits: Debits[]) => {
          this.debits = debits;

          if (debits != null && debits.length != 0) {
            this.customerService
              .getAccountInfo(this.payment.account, "HCB_BANK")
              .pipe(untilDestroyed(this))
              .subscribe(
                (acc: any) => {
                  debits.forEach(element => {
                    let debit: debitData = {
                      id: element.id,
                      name_reminder: acc.name,
                      account_reminder: acc.account,
                      account: element.account,
                      money: element.money,
                      content: element.content,
                      status: element.status,
                      type: "debit"
                    };

                    this.debitsData.splice(this.debitsData.indexOf(debit), 1);
                    this.debitsData.push(debit);
                    //this.source.append(debit);
                    this.source.reset();
                    this.source.load([ ...this.debitsData, ...this.creditData]);
                    this.loadingList = false;
                  });

                  //this.source.load(this.debitsData);
                },
                (err: HttpErrorResponse) => {
                  this.loadingList = false;
                }
              );
          }
        },
        (err: any) => {
          this.loadingList = false;
        }
      );
    this.subscription.add(subscription);
  }

  getCredits() {
    this.loadingList = true;
    var subscription = this.customerService.credits$.pipe(untilDestroyed(this)).subscribe(
      (credits: Credits[]) => {
        this.credits = credits;
        if (credits != null && credits.length != 0) {
          credits.forEach(element => {
            this.customerService
              .getAccountInfo(element.account, "HCB_BANK")
              .pipe(untilDestroyed(this))
              .subscribe(
                (accountCredit: any) => {
                  let credits: debitData = {
                    id: element.id,
                    name_reminder: accountCredit.name,
                    account_reminder: accountCredit.account,
                    account: this.payment.account,
                    money: element.money,
                    content: element.content,
                    status: element.status,
                    type: "credit"
                  };

                  this.creditData.splice(this.creditData.indexOf(credits), 1);
                  this.creditData.push(credits);
                  //this.source.append(credits);
                  this.source.reset();
                  this.source.load([ ...this.debitsData, ...this.creditData]);
                  this.loadingList = false;
                },
                (err: HttpErrorResponse) => {
                  this.loadingList = false;
                }
              );
          });
        }
      },
      (err: any) => {
        this.loadingList = false;
      }
    );
    this.subscription.add(subscription);
  }

  onDeleteConfirm(event): void {
    this.dialogService
      .open(DialogDimissPromptComponent, {
        context: {
          creditId: event.data.type === "credit" ? event.data.id : null,
          debitId: event.data.type === "debit" ? event.data.id : null
        }
      })
      .onClose.subscribe((content: string) => (this.content_dimiss = content));
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }

  ngOnInit() {
    //this.loadingList = true;
    //this.source.load(this.debitsData);
  }

  ngOnDestroy() {
    localStorage.removeItem("paymentAccount");
    this.subscription.unsubscribe();
  }
}

export interface debitData {
  id: number,
  name_reminder: string,
  account_reminder: string,
  account: string,
  money: number,
  content: string,
  status: string,
  type: string
}
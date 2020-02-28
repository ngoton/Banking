import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { CustomerService } from '../../../_services/customer.service';
import { Customers, Debits, Payment, Credits } from '../../../_models/customer.model';
import { DialogDimissPromptComponent } from '../dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "ngx-remider-list",
  templateUrl: "./remider-list.component.html",
  styleUrls: ["./remider-list.component.scss"]
})
export class RemiderListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  loadingList: boolean = false;

  customer: Customers = new Customers();
  payment: Payment = new Payment();
  debits: Debits[] = new Array();
  credits: Credits[] = new Array();
  debitsData: debitData[] = new Array();

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
        { name: "payment", title: '<i class="nb-checkmark" ngIf=""></i>' }
      ]
      //   custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ],
      //   position: 'right'
    },
    rowClassFunction: row => {
      var curPaymentAccount = localStorage.getItem("paymentAccount");
      if (curPaymentAccount != null && curPaymentAccount != "") {
        if (row.data.account_reminder == curPaymentAccount) {
          return "hide-custom-action";
        } else {
          return "hide-action";
        }
      } else {
        return "hide-all";
      }
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
    private dialogService: NbDialogService
  ) {
    // const data = [
    //   {
    //     name_reminder: 'Nguyễn Minh Phong',
    //     account_reminder: '8492398237874350293',
    //     account_debt: '80928539384534543',
    //     money: '1,000.000',
    //     content_debt: 'Trả tiền mừng cưới',
    //     status: this.status[0]
    //   },
    //   {
    //     name_reminder: 'Nguyễn Văn Nam',
    //     account_reminder: '394893859345934923',
    //     account_debt: '8492398237874350293',
    //     money: '20.000',
    //     content_debt: 'Trả tiền xe ôm',
    //     status: this.status[1]
    //   },
    //   {
    //     name_reminder: 'Nguyễn Minh Phong',
    //     account_reminder: '8492398237874350293',
    //     account_debt: '2839823948234234025',
    //     money: '15,000.000',
    //     content_debt: 'Thanh toán nghiệm thu hợp đồng',
    //     status: this.status[0]
    //   }
    // ];
    // this.source.load(data);

    this.loadingList = true;
    var subscription = this.customerService.acctDetail$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (customer: Customers) => {
          this.loadingList = false;
          this.customer = new Customers(customer);
          this.getPayment();
          this.getDebits();
          this.getCredits();
        },
        (err: any) => {
          this.loadingList = false;
        }
      );
  }

  onCustomAction(event) {
    switch (event.action) {
      case "payment":
        this.paymentCredit(event.data);
        break;
    }
  }

  paymentCredit(data) {}

  getPayment() {
    this.loadingList = true;
    var subscription = this.customerService.payments$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (payment: Payment) => {
          this.loadingList = false;
          this.payment = new Payment(payment);
          localStorage.setItem("paymentAccount", this.payment.account);
        },
        (err: any) => {
          this.loadingList = false;
        }
      );
  }

  getDebits() {
    this.loadingList = true;
    var subscription = this.customerService.debits$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (debits: Debits[]) => {
          this.loadingList = false;
          this.debits = debits;

          if (debits != null && debits.length != 0) {
            debits.forEach(element => {
              let debit: debitData = {
                id: element.id,
                name_reminder: this.customer.fullName,
                account_reminder: this.payment.account,
                account: element.account,
                money: element.money,
                content: element.content,
                status: element.status,
                type: "debit"
              };

              // const existsDebit = this.debitsData.find(x => x.id == debit.id);
              // if(existsDebit === null){
              //   this.debitsData.push(debit);
              // }

              this.debitsData.splice(this.debitsData.indexOf(debit), 1);
              this.debitsData.push(debit);
              this.source.load(this.debitsData);
              this.loadingList = false;
            });
          }
        },
        (err: any) => {
          this.loadingList = false;
        }
      );
  }

  getCredits() {
    this.loadingList = true;
    var subscription = this.customerService.credits$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (credits: Credits[]) => {
        this.loadingList = false;
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

                  this.debitsData.splice(this.debitsData.indexOf(credits), 1);
                  this.debitsData.push(credits);
                  this.source.load(this.debitsData);
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
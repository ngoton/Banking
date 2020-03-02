import { Component, OnInit, ViewChild, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../../../_services/customer.service';
import { CreditService } from '../../../../_services/credit.service';
import { NotifierService } from 'angular-notifier';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { DialogOTPPromptComponent } from '../../dialog-otp-prompt/dialog-otp-prompt.component';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogDimissPromptComponent } from '../../dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { Subject, from } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { takeUntil, flatMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreditListComponent implements OnInit, OnDestroy {
  @Input() payment: any;
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private destroy$: Subject<void> = new Subject<void>();
  private readonly notifi: NotifierService;

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
      account_reminder: {
        title: "Tài khoản gửi",
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
        { name: "pay", title: '<i class="nb-checkmark"></i>' }
      ]
      //   custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ],
      //   position: 'right'
    },
    rowClassFunction: row => {
      if(row.data.status === "Paid"){
        return "hide-custom-action";
      }
      return "show-all";
    },
    attr: {
      class: "table table-bordered"
    },
    hideSubHeader: true
  };

  creditSource: LocalDataSource = new LocalDataSource();
  accountCredit: any;
  creditsData: any[];
  content_dimiss: string;

  constructor(private customerService: CustomerService,
              private creditService: CreditService,
              private notifiService: NotifierService,
              private dialogService: NbDialogService) {
                this.notifi = notifiService;
                
               }

  getAccountByCredit(account) {
    this.customerService.getAccountInfo(account, "HCB_BANK")
    .pipe(untilDestroyed(this))
    .subscribe(
      account => {
        this.accountCredit = account;
      }
    );
  }
  
  ngOnInit() {
    debugger;
    this.customerService.getCreditsData()

    setTimeout(() => {
      this.customerService.credits$.pipe(takeUntil(this.destroy$))
      .subscribe(
        credits => {
          if (credits != null && credits.length != 0) {
            this.creditsData = credits;
            
            let creditDataList = [];
            this.creditsData.forEach(element => {
              let credits = {
                id: element.id,
                name_reminder: "",
                account_reminder: element.account,
                account: this.payment.account,
                money: element.money,
                content: element.content,
                status: element.status,
                type: "credit"
              }
              creditDataList.push(credits);
          });

          this.creditSource.load(creditDataList);
            
          }
        } 
      );
    }, 2000);
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
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

              this.creditSource.refresh();
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

  onDeleteConfirm(event): void {
    this.dialogService
      .open(DialogDimissPromptComponent, {
        context: {
          creditId: event.data.type === "credit" ? event.data.id : null,
          debitId: event.data.type === "debit" ? event.data.id : null
        }
      })
      .onClose.subscribe((content: string) => (this.content_dimiss = content));
  }

}

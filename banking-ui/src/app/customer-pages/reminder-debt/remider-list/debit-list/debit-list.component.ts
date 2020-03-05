import { Component, OnInit, Input, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NotifierService } from 'angular-notifier';
import { NbDialogService } from '@nebular/theme';
import { DialogDimissPromptComponent } from '../../dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { Subject } from 'rxjs';
import { takeUntil, flatMap, finalize } from 'rxjs/operators';
import { AccountInfo } from '../../../../_models/customer.model';
import { NotificationSocketService } from '../../../../_services/notification-socket.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'ngx-debit-list',
  templateUrl: './debit-list.component.html',
  styleUrls: ['./debit-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DebitListComponent implements OnInit, OnDestroy {

  @Input() payment: any;
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private destroy$: Subject<void> = new Subject<void>();
  private readonly notifi: NotifierService;
  loadingDebit = false;
  
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
      account: {
        title: "Tài khoản nợ",
        type: "string"
      },
      money: {
        title: "Số tiền (VNĐ)",
        type:'html',
        valuePrepareFunction: (value) => {
          return '<div class="money-format"> ' + value + ' </div>';
        }
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
      return "hide-custom-action";
    },
    attr: {
      class: "table table-bordered"
    },
    hideSubHeader: true
  };

  debitSource: LocalDataSource = new LocalDataSource();
  accountInfo: AccountInfo;

  notifyService: any;
  client: any;

  constructor(private customerService: CustomerService,
              private notification: NotifierService,
              private dialogService: NbDialogService,
              private decimalPipe: DecimalPipe,
              private notificationSocketService: NotificationSocketService) {
                this.notifyService = notificationSocketService;
   }

  ngOnInit() {
    this.client = this.notifyService.Connection();
    this.customerService.getDebitsData();

    setTimeout(() => {
      this.loadingDebit = true;
      this.customerService.getAccountInfo(this.payment.account, "HCB_BANK").pipe(
        flatMap(
          accountInfo => {
            this.accountInfo = accountInfo;
            return this.customerService.debits$;
          }
        ),
        finalize(()=>{
          this.debitSource.refresh();
        })
      ).subscribe(
        debits => {
          if (debits != null && debits.length != 0) {
            var debitData = [];

            debits.forEach(element => {
              
              let debit = {
                id: element.id,
                name_reminder: this.accountInfo.name,
                account_reminder: this.accountInfo.account,
                account: element.account,
                money: this.decimalPipe.transform(element.money, "1.0-3"),
                content: element.content,
                status: element.status,
                type: "debit"
              };

              debitData.push(debit);
            });

            debitData = debitData.filter(x => x.status !== "Canceled");
            this.debitSource.load(debitData);
            this.loadingDebit = false;
          }   
        }
      );
    }, 2000);
  }

  sendNotifyRemove(debitData, content) {
    var userInfo = JSON.parse(localStorage.getItem("userDetails"));

    const notification = {
      sender: userInfo.username,
      message: `Nhắc nợ '${debitData.content}' đã hủy với nội dung ${content}`
    }

    const PATH = "/app" + this.notifyService.topic + userInfo.username;

    this.client.connect({}, frame => {
      console.log("Connected: ", frame);
      this.client.send(PATH, {}, JSON.stringify(notification));
    }, (err: any) => {
      console.log("errorCallBack -> " + err)
      setTimeout(() => {
        this.sendNotifyRemove(debitData, content);
      }, 5000);
    });
  }

  accountChange(item) {
    this.customerService.getAccountInfo(item.account, "HCB_BANK")
    .pipe(untilDestroyed(this))
    .subscribe(
      (acc: AccountInfo) => {
        this.accountInfo = acc;
      }
    );
  }
  
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDeleteConfirm(event): void {
    this.dialogService
      .open(DialogDimissPromptComponent, {
        context: {
          credit: event.data.type === "credit" ? event.data : null,
          debit: event.data.type === "debit" ? event.data : null
        }
      })
      .onClose.subscribe((dimissObject: any) => {
        this.sendNotifyRemove(dimissObject.object, dimissObject.content);
      });
  }

}

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
      return "hide-custom-action";
    },
    attr: {
      class: "table table-bordered"
    },
    hideSubHeader: true
  };

  debitSource: LocalDataSource = new LocalDataSource();
  accountInfo: AccountInfo;
  content_dimiss: string;

  constructor(private customerService: CustomerService,
              private notification: NotifierService,
              private dialogService: NbDialogService) {
    
   }

  ngOnInit() {
    this.customerService.getDebitsData();

    setTimeout(() => {
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
                money: element.money,
                content: element.content,
                status: element.status,
                type: "debit"
              };

              debitData.push(debit);
            });

            this.debitSource.load(debitData);
          }   
        }
      );
    }, 2000);
  }
  
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
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

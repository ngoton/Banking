import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CustomerService } from '../../_services/customer.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { mergeMap, finalize } from 'rxjs/operators';
import { PaymentTransactionService } from '../../_services/payment-transaction.service';
import { SavingTransactionService } from '../../_services/saving-transaction.service';
import { forkJoin } from 'rxjs';
import { DecimalPipe, formatDate, DatePipe } from '@angular/common';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  transaction_type: string;
  content: string;
  date: string;
  money: string;
}

@Component({
  selector: 'ngx-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  account: string = "";

  customColumn = {bindingName: 'transaction_type', showName: 'Loại giao dịch'};
  defaultColumns = [
    {bindingName: 'content', showName: 'Nội dung'},
    {bindingName: 'date', showName: 'Ngày'},
    {bindingName: 'money', showName: 'Số tiền'}];
  allColumns = ['transaction_type', 'content', 'date', 'money'];

  receiveHistories: TreeNode<FSEntry> = {
    data: {
      transaction_type: 'Nhận tiền',
      content: '',
      date: '',
      money: '',
    },
    children: []
  };
  transferHistories: TreeNode<FSEntry> = {
    data: {
      transaction_type: 'Chuyển khoản',
      content: '',
      date: '',
      money: '',
    },
    children: []
  };
  creditHistories: TreeNode<FSEntry> = {
    data: {
      transaction_type: 'Thanh toán nhắc nợ',
      content: '',
      date: '',
      money: '',
    },
    children: []
  };

  private data: TreeNode<FSEntry>[] = [];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private decimalPipe: DecimalPipe,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private customerService: CustomerService,
              private paymentTransactionService: PaymentTransactionService,
              private savingTransactionService: SavingTransactionService) {
    //this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  loadSource() {
    debugger;

    if(this.account != "") {
      this.customerService.getByPaymentAccount(this.account).pipe(untilDestroyed(this),
        mergeMap(
          (success: any) => {
            const paymentReceive = this.paymentTransactionService.getPaymentReceiveByCustomer(success.customerId);
            const savingReceive = this.savingTransactionService.getSavingReceiveByCustomer(success.customerId);
            const paymentTransfer = this.paymentTransactionService.getPaymentTransferByCustomer(success.customerId);
            const paymentCredit = this.paymentTransactionService.getPaymentCreditByCustomer(success.customerId);
            
            return forkJoin(paymentReceive, savingReceive, paymentTransfer, paymentCredit);
          }
        ),
        finalize(() => {})
      ).subscribe(
        ([payments, savings, transfers, credits]) => {
          payments.content.forEach(item => {
            const dateTimeArr: any[] = item.createdAt.split(" ", 2);

            let node : TreeNode<FSEntry> = {
              data: {
                transaction_type: null,
                content: item.content,
                date: dateTimeArr.length != 0 ? dateTimeArr[0] : "",
                money: this.decimalPipe.transform(
                  item.money,
                  "1.0-3"
                ),
              }
            }
            this.receiveHistories.children.push(node);
          });

          savings.content.forEach(item => {
            const dateTimeArr: any[] = item.createdAt.split(" ", 2);

            let node : TreeNode<FSEntry> = {
              data: {
                transaction_type: null,
                content: item.content,
                date: dateTimeArr.length != 0 ? dateTimeArr[0] : "",
                money: this.decimalPipe.transform(
                  item.money,
                  "1.0-3"
                ),
              }
            }

            this.receiveHistories.children.push(node);
          });

          transfers.content.forEach(item => {
            const dateTimeArr: any[] = item.createdAt.split(" ", 2);

            let node : TreeNode<FSEntry> = {
              data: {
                transaction_type: null,
                content: item.content,
                date: dateTimeArr.length != 0 ? dateTimeArr[0] : "",
                money: this.decimalPipe.transform(
                  item.money*(-1),
                  "1.0-3"
                ),
              }
            }

            this.transferHistories.children.push(node);
          });

          credits.content.forEach(item => {
            const dateTimeArr: any[] = item.createdAt.split(" ", 2);

            let node : TreeNode<FSEntry> = {
              data: {
                transaction_type: null,
                content: item.content,
                date: dateTimeArr.length != 0 ? dateTimeArr[0] : "",
                money: this.decimalPipe.transform(
                  item.money*(-1),
                  "1.0-3"
                ),
              }
            }

            this.creditHistories.children.push(node);
          });

          this.data = [this.receiveHistories, this.transferHistories, this.creditHistories];
          this.dataSource = this.dataSourceBuilder.create(this.data);
        }
      );
    }
    else{
      this.data = [];
      this.dataSource = this.dataSourceBuilder.create(this.data);
    }
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  ngOnInit(){}

  ngOnDestroy(){}
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle
      [expanded]="expanded"
      *ngIf="isDir(); else fileIcon"
    >
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="corner-down-right"></nb-icon>
    </ng-template>
  `
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind !== null;
  }
}

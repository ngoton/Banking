import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { PaymentTransactionService } from '../../_services/payment-transaction.service';
import { SavingTransactionService } from '../../_services/saving-transaction.service';
import { CustomerService } from '../../_services/customer.service';
import { pipe } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Payment, Savings } from '../../_models/customer.model';
import { elementAt } from 'rxjs/operators';

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
  customColumn = {bindingName: 'transaction_type', showName: 'Loại giao dịch'};
  defaultColumns = [
    {bindingName: 'content', showName: 'Nội dung'},
    {bindingName: 'date', showName: 'Ngày'},
    {bindingName: 'money', showName: 'Số tiền'}];
  allColumns = ['transaction_type', 'content', 'date', 'money'];

  paymentInfor: Payment = new Payment();
  savingInfor: Savings = new Savings();
  receiveHistories: TreeNode<FSEntry>[]= new Array();
  transferHistories: TreeNode<FSEntry>[] = new Array();
  creditHistories: TreeNode<FSEntry>[] = new Array();

  private data: TreeNode<FSEntry>[] = [
    {
      data: {
        transaction_type: 'Nhận tiền',
        content: '',
        date: '',
        money: ''
      },
      children: this.receiveHistories
    },
    {
      data: {
        transaction_type: 'Thanh toán',
        content: '',
        date: '',
        money: ''
      },
      children: [
        {
          data: {
            transaction_type: null,
            content: 'Tiền lì xì',
            date: '28/01/2020',
            money: '500.000'
          }
        },
        {
          data: {
            transaction_type: null,
            content: 'Tiền lì xì',
            date: '28/01/2020',
            money: '500.000'
          }
        },
        {
          data: {
            transaction_type: null,
            content: 'Tiền lì xì',
            date: '28/01/2020',
            money: '500.000'
          }
        }
      ]
    },
    {
      data: {
        transaction_type: 'Nhắc nợ',
        content: '',
        date: '',
        money: ''
      },
      children: [
        {
          data: {
            transaction_type: null,
            content: 'Tiền lì xì',
            date: '28/01/2020',
            money: '500.000'
          }
        },
        {
          data: {
            transaction_type: null,
            content: 'Tiền lì xì',
            date: '28/01/2020',
            money: '500.000'
          }
        },
        {
          data: {
            transaction_type: null,
            content: 'Tiền lì xì',
            date: '28/01/2020',
            money: '500.000'
          }
        }
      ]
    }
  ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private customerService: CustomerService,
              private paymentTransationService: PaymentTransactionService,
              private savingTransactionService: SavingTransactionService) {
    // this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  getPayment() {
    this.customerService.payments$
      .pipe(untilDestroyed(this))
      .subscribe(
        (payment: Payment) => {
          this.paymentInfor = payment;
          if(this.paymentInfor != null){
            this.getPaymentReceiveHistory();
          }
        },
        (err: any) => {

        }
      );
  }

  getSaving() {
    this.customerService.savings$
      .pipe(untilDestroyed(this))
      .subscribe(
        (saving: Savings) => {
          this.savingInfor = saving;
          if(this.savingInfor != null){
            this.getSavingReceiveHistory();
          }
        },
        (err: any) => {

        }
      );
  }

  getPaymentReceiveHistory() {
    debugger;
    this.paymentTransationService.getPaymentReceive(this.paymentInfor.paymentId)
    .pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        success.content.forEach(item => {
          let node : TreeNode<FSEntry> = {
            data: {
              transaction_type: null,
              content: item.content,
              date: item.createdAt,
              money: item.money,
            }
          }
          this.receiveHistories.splice(this.receiveHistories.indexOf(node), 1);
          this.receiveHistories.push(node);
        });
        this.dataSource = this.dataSourceBuilder.create(this.data);
      }
    );
  }

  getSavingReceiveHistory() {
    debugger;
    this.savingTransactionService.getSavingReceive(this.paymentInfor.paymentId)
    .pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        success.content.forEach(item => {
          let node : TreeNode<FSEntry> = {
            data: {
              transaction_type: null,
              content: item.content,
              date: item.createdAt,
              money: item.money,
            }
          }
          this.receiveHistories.splice(this.receiveHistories.indexOf(node), 1);
          this.receiveHistories.push(node);
        });
        this.dataSource = this.dataSourceBuilder.create(this.data);
      }
    );
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
    return minWithForMultipleColumns + nextColumnStep * index;
  }

  ngOnInit() {
    this.getPayment();
  }

  ngOnDestroy() {}
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

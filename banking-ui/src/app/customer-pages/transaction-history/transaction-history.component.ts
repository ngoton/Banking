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
import { pipe, forkJoin, combineLatest, Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Payment, Savings } from '../../_models/customer.model';
import { elementAt, flatMap, finalize, retry, mergeMap } from 'rxjs/operators';
import { TransactionHistoryService } from './transaction-history.service';
import { PaymentService } from '../../_services/payment.service';
import { DecimalPipe } from '@angular/common';

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
  transaction: TransactionHistoryService;
  getPaymentSaving: Observable<any>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private customerService: CustomerService,
              private paymentService: PaymentService,
              private paymentTransactionService: PaymentTransactionService,
              private savingTransactionService: SavingTransactionService,
              private transationHistoryService: TransactionHistoryService,
              private decimalPipe: DecimalPipe) {
                this.transaction = transationHistoryService;
                // this.transaction.getPaymentHistoryData();
    // this.dataSource = this.dataSourceBuilder.create(this.data);
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

  getPaymentTransfer() {  
    const customer = JSON.parse(localStorage.getItem("customerInfor"));

    this.paymentService.getPaymentsByCustomerId(customer.customerId).pipe(untilDestroyed(this),
      mergeMap(
        payment => {
          const transferPayment = this.paymentTransactionService.getPaymentTransfer(payment[0].id);
          const creditPayment = this.paymentTransactionService.getPaymentCredit(payment[0].id);

          return forkJoin([transferPayment, creditPayment]);
        }
      ),
      finalize(() =>{})
    )
    .subscribe(
      success => {
        success[0].content.forEach(item => {
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

        success[1].content.forEach(item => {
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

  ngOnInit() {
    debugger;
    this.customerService.getPaymentAndSavingReceive().pipe(untilDestroyed(this))
      .subscribe(
        success => {
          success[0].content.forEach(item => {
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

          success[1].content.forEach(item => {
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

          this.data = [this.receiveHistories, this.transferHistories, this.creditHistories];
          this.dataSource = this.dataSourceBuilder.create(this.data);

          this.getPaymentTransfer();
        }
      );
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

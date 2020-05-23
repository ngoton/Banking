import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
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
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit, OnDestroy {

  customColumn = {bindingName: 'transaction_type', showName: 'Loại giao dịch'};
  defaultColumns = [
    {bindingName: 'content', showName: 'Nội dung'},
    {bindingName: 'date', showName: 'Ngày'},
    {bindingName: 'money', showName: 'Số tiền'}];
  allColumns = ['transaction_type', 'content', 'date', 'money'];

  // paymentInfor: Payment = new Payment();
  // savingInfor: Savings = new Savings();
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
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {

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

  getPaymentTransfer() {
  }


  ngOnInit(){
    debugger;
    this.data = [this.receiveHistories, this.transferHistories, this.creditHistories];
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
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

import { Component, Input, OnInit } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';

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
export class TransactionHistoryComponent implements OnInit {
  customColumn = {bindingName: 'transaction_type', showName: 'Loại giao dịch'};
  defaultColumns = [
    {bindingName: 'content', showName: 'Nội dung'},
    {bindingName: 'date', showName: 'Ngày'},
    {bindingName: 'money', showName: 'Số tiền'}];
  allColumns = ['transaction_type', 'content', 'date', 'money'];

  private data: TreeNode<FSEntry>[] = [
    {
      data: {
        transaction_type: 'Nhận tiền',
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

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
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

  ngOnInit() {}
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

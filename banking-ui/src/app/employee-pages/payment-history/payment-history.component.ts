import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { DecimalPipe } from '@angular/common';
import { FsIconComponent } from '../employee-pages.component';


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

  private data: TreeNode<FSEntry>[] = [
    {
      data: { transaction_type: 'Projects', content: '', date:'', money: '' },
      children: [
        { data: { transaction_type: 'project-1.doc', content: 'doc', date: '17-05-2020', money: '100,000' } },
        { data: { transaction_type: 'project-2.doc', content: 'doc', date: '17-05-2020', money: '100,000' } }
      ],
    }
  ];
  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private decimalPipe: DecimalPipe,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
  }

  ngOnInit(){
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
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  ngOnDestroy(){}
}

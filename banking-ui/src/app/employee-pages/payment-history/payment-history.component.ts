import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { DecimalPipe } from '@angular/common';
import { FsIconComponent } from '../employee-pages.component';
import { PaymentTransactionService } from '../../_services/payment-transaction.service';
import { PartnerService } from '../../_services/partner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LocalDataSource } from 'ng2-smart-table';

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

  settings = {
    mode: 'external',
    columns: {
      code: {
        title: "Mã nhân viên",
        type: "string"
      },
      firstName: {
        title: "Họ và tên đệm",
        type: "string"
      },
      lastName: {
        title: "Tên",
        type: "string"
      },
      birthDate: {
        title: "Ngày sinh",
        type: "string"
      },
      phone: {
        title: "Số điện thoại",
        type: "string"
      }
    },
  
    hideSubHeader: true
  }



  private data: TreeNode<FSEntry>[] = [];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  partnerList: any[] = [];
  paymentList :any[] = [];

  source: LocalDataSource = new LocalDataSource();


  constructor(private paymentTransactionService: PaymentTransactionService,
    private themeService: NbThemeService,
    private partnerService: PartnerService) {
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
    // this.dataSource = this.dataSourceBuilder.create(this.data);
    this.getData();
  }
  ngOnDestroy(){}

  onSubmit(){
    this.paymentTransactionService.getPaymentTransactionAdministrator(name)
    .subscribe(
      (response: any) => {

      },
      (err: HttpErrorResponse) => {

      }
    )
  }


  getData(){
    this.partnerService.getAll().pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.partnerList = response;
      },
      (err: HttpErrorResponse) => {
        
      }
    )
  }

  getPaymentHistory(selectedData) {
    this.paymentTransactionService.getPaymentTransactionAdministrator(selectedData.name).pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.paymentList = response;
        this.source.load(this.paymentList);
      },
      (err: HttpErrorResponse) => {
        
      }
    )

  }

}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import {
  NbSortDirection,
  NbSortRequest,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder
} from '@nebular/theme';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FsIconComponent } from '../employee-pages.component';
import { PaymentTransactionService } from '../../_services/payment-transaction.service';
import { PartnerService } from '../../_services/partner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LocalDataSource } from 'ng2-smart-table';
import { NotifierService } from 'angular-notifier';
import { Partners } from '../../_models/customer.model';

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
 
  settings = {
    mode: 'external',
    columns: {
      code: {
        title: "Mã giao dịch",
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
      createdAt: {
        title: "Ngày giao dịch",
        type: "string"
      }
    },
    actions: {
      columnTitle: "Thao tác",
      add: false,
      edit: false,
      delete: false
    },
    hideSubHeader: true
  }

  selectedPartner: any;
  startDate: Date;
  endDate: Date;
  partnerList: any[] = [];
  paymentList :any[] = [];
  loadingPayment: boolean = false;
  private readonly notifier: NotifierService;

  source: LocalDataSource = new LocalDataSource();


  constructor(private paymentTransactionService: PaymentTransactionService,
              private partnerService: PartnerService,
              private decimalPipe: DecimalPipe,
              private datePipe: DatePipe,
              private notificationService: NotifierService) {
                this.notifier = notificationService;
  }

  ngOnInit(){
    this.getData();
  }
  ngOnDestroy(){}

  getData(){
    this.partnerService.getAll().pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.partnerList = response;
        this.selectedPartner = new Partners();
        this.getPaymentHistory();
      },
      (err: HttpErrorResponse) => {
        
      }
    )
  }

  getPaymentHistory() {
    debugger;
    this.loadingPayment = true;
    let start = this.startDate != undefined ? this.datePipe.transform(this.startDate,"yyyy-MM-dd") : null;
    let end = this.endDate != undefined ? this.datePipe.transform(this.endDate,"yyyy-MM-dd") : null;

    this.paymentTransactionService.getPaymentTransactionAdministrator(this.selectedPartner.name, start, end).pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.paymentList = response.content;
        this.paymentList.forEach(element => {
          const dateTimeArr: any[] = element.createdAt.split(" ", 2);
          
          element.money = this.decimalPipe.transform(
            element.money,
            "1.0-3"
          );
          element.createdAt = dateTimeArr.length != 0 ? dateTimeArr[0] : "";
        });
        this.source.load(this.paymentList);
        this.loadingPayment = false;
        
      },
      (err: HttpErrorResponse) => {
        this.loadingPayment = false;
        if(start != null && end != null){
          this.notifier.show({
            type: "error",
            message: "Không lấy được danh sách đối soát! " + err,
            id: "get-error"
          });
        }
        
      }
    )

  }

  partnerChange(selectedData){
    this.selectedPartner = selectedData;
    this.paymentList = [];
    this.source.load(this.paymentList);
    this.getPaymentHistory();
  }

  dateChange(){
    this.paymentList = [];
    this.source.load(this.paymentList);
    this.getPaymentHistory();
  }
}

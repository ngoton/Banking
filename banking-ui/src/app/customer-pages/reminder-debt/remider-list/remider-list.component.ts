import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { CustomerService } from '../../../_services/customer.service';
import { Customers, Debits, Payment, Credits, PaymentTransactions, Beneficiarys, AccountInfo } from '../../../_models/customer.model';
import { DialogDimissPromptComponent } from '../dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, Subject, combineLatest, Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
import { takeUntil, map, flatMap, mergeMap, switchMap, finalize } from 'rxjs/operators';
import { CreditService } from '../../../_services/credit.service';
import { DebitService } from '../../../_services/debit.service';
import { NotifierService } from 'angular-notifier';
import { DialogOTPPromptComponent } from '../dialog-otp-prompt/dialog-otp-prompt.component';
import { PaymentTransactionService } from '../../../_services/payment-transaction.service';
import { async } from '@angular/core/testing';
import { NotificationSocketService } from '../../../_services/notification-socket.service';

@Component({
  selector: "ngx-remider-list",
  templateUrl: "./remider-list.component.html",
  styleUrls: ["./remider-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RemiderListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  loadingList: boolean = false;

  customer: Customers = new Customers();
  payment: Payment = new Payment();
  debits: Debits[] = new Array();
  credits: Credits[] = new Array();

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
      name_reminder: {
        title: "Người gửi",
        type: "string"
      },
      account_reminder: {
        title: "Tài khoản gửi",
        type: "string"
      },
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
        { name: "pay", title: '<i class="nb-checkmark" ngIf=""></i>' }
      ]
      //   custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ],
      //   position: 'right'
    },
    rowClassFunction: row => {
      var curPaymentAccount = localStorage.getItem("paymentAccount");
      if (curPaymentAccount != null && curPaymentAccount != ""){
        if(row.data.type == 'debit'){
          return "hide-custom-action"; //Ẩn nút Thanh toán nợ
        }
        if(row.data.type == 'credit'){
          return "show-all" //Hiện cả nút Thanh toán và Hủy
        }
      }
      return "hide-all";
    },
    attr: {
      class: "table table-bordered"
    },
    hideSubHeader: true
  };

  status = { 0: "Chưa thanh toán", 1: "Đã thanh toán" };
  source: LocalDataSource = new LocalDataSource();
  content_dimiss: string;
  accountInfor: any;

  constructor(
    private customerService: CustomerService
  ) {
    this.payment = new Payment();
  }
  
  ngOnInit() {
    this.customerService.getPaymentsData();

    setTimeout(() => {
      this.customerService.payments$.pipe(takeUntil(this.destroy$))
      .subscribe(
        payment => {
          this.payment = payment;
        } 
      );
    }, 2000)

    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
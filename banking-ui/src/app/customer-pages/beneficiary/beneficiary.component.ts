import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../_services/customer.service';
import { Customers, Beneficiarys } from '../../_models/customer.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BenificiaryService } from '../../_services/benificiary.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: "ngx-beneficiary",
  templateUrl: "./beneficiary.component.html",
  styleUrls: ["./beneficiary.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BeneficiaryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private readonly notifier: NotifierService;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: "Tên",
        type: "string"
      },
      shortName: {
        title: "Tên gợi nhớ",
        type: "string"
      },
      account: {
        title: "Số tài khoản",
        type: "string"
      },
      bankName: {
        title: "Ngân hàng",
        type: "string"
      }
    },
    actions: {
      columnTitle: "Thao tác",
      add: true,
      edit: true,
      delete: true
      //   custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      // ],
      //   position: 'right'
    },
  };

  loadingBenificiary = false;
  source: LocalDataSource = new LocalDataSource();
  benificiariesData: Beneficiarys[];

  constructor(
    private route: Router,
    private notifications: NotifierService,
    private customerService: CustomerService,
    private befiniciaryService: BenificiaryService
  ) {
    this.notifier = notifications;
  }

  onCreateConfirm(event) {
    this.befiniciaryService
      .insert(event.newData)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          
          this.notifier.show({
            type: "success",
            message: "Thêm mới thành công!",
            id: "create-success"
          });

          event.confirm.resolve();
          this.loadData();
        },
        (err: HttpErrorResponse) => {
          
          this.notifier.show({
            type: "error",
            message: `Thêm mới không thành công! ${err}`,
            id: "create-error"
          });

          event.confirm.reject();
        }
      );
  }

  onDeleteConfirm(event) {
    if (window.confirm("Bạn có chắc chắn muốn xóa người này không?")) {
      this.befiniciaryService
        .delete(event.data.id)
        .pipe(untilDestroyed(this))
        .subscribe(
          (res: any) => {           
            this.notifier.show({
              type: "success",
              message: "Xóa thành công!",
              id: "delete-success"
            });

            event.confirm.resolve();
          },
          (err: any) => {            
            this.notifier.show({
              type: "error",
              message: `Xóa không thành công! ${err}`,
              id: "delete-error"
            });

            event.confirm.reject();
          }
        );
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    this.befiniciaryService
      .update(event.newData)
      .pipe(untilDestroyed(this))
      .subscribe(
        (res: any) => {
          
          this.notifier.show({
            type: "success",
            message: "Cập nhật thành công!",
            id: "save-success"
          });

          event.confirm.resolve();
        },
        (err: HttpErrorResponse) => {
          
          this.notifier.show({
            type: "error",
            message: `Cập nhật không thành công! ${err}`,
            id: "save-error"
          });

          event.confirm.reject();
        }
      );
  }

  loadData() {
    this.loadingBenificiary = true;
    // Subscribe to user Details from UserService
    setTimeout(() => {
      let customerInfor = JSON.parse(localStorage.getItem('customerInfor'));
      if(customerInfor != null){
        this.befiniciaryService.getByCustomerCode(customerInfor.code).pipe(takeUntil(this.destroy$))
        .subscribe((response: Beneficiarys[]) => {
          this.loadingBenificiary = false;
          this.benificiariesData = response;
          this.source.load(this.benificiariesData);
        }, (err: any) => {
          this.loadingBenificiary = false;
        });
      }
      else{
        this.route.navigate(['onboarding/login']);
      }
        
    }, 2000)
  }

  ngOnInit() {
    this.customerService.getBeneficiariesData();
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

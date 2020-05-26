import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NotifierService } from 'angular-notifier';
import { User } from '../../_models/user';
import { StaffService } from '../../_services/staff.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NbDialogService, NbDateService } from '@nebular/theme';
import { format } from 'url';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'ngx-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountManagerComponent implements OnInit, OnDestroy {

  loadingStaffs: boolean = false;
  private readonly notifier: NotifierService;

  settings = {
    mode: 'external',
    columns: {
      code: {
        title: "Mã khách hàng",
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
    actions: {
      columnTitle: "Thao tác",
      add: false,
      edit: false,
      delete: false
    },
    hideSubHeader: true
  };

  loadingCustomer = false;
  source: LocalDataSource = new LocalDataSource();
  customers: any[] = new Array();

  constructor(private customerService: CustomerService,
              private dialogService: NbDialogService,
              private notificationService: NotifierService) {

                this.notifier = notificationService;
               }

  loadData() {
    this.loadingCustomer = true;
    this.customerService.getAll().pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.loadingCustomer = false;
        this.customers = success.content;
        this.source.load(this.customers);
      }
    );
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {

  }

}

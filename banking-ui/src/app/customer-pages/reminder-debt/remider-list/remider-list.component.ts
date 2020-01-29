import { Component, OnInit, OnDestroy } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { CustomerService } from '../../../_services/customer.service';
import { Customers } from '../../../_models/customer.model';
import { DialogDimissPromptComponent } from '../dialog-dimiss-prompt/dialog-dimiss-prompt.component';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-remider-list',
  templateUrl: './remider-list.component.html',
  styleUrls: ['./remider-list.component.scss']
})
export class RemiderListComponent implements OnInit, OnDestroy {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name_reminder: {
        title: 'Người gửi',
        type: 'string',
      },
      account_reminder: {
        title: 'Tài khoản gửi',
        type: 'string',
      },
      account_debt: {
        title: 'Tài khoản nợ',
        type: 'string',
      },
      money: {
        title: 'Số tiền (VNĐ)',
        type: 'string',
      },
      content_debt: {
        title: 'Nội dung',
        type: 'string',
      },
      status: {
        title: 'Tình trạng',
        type: 'string',
      }
    },
    hideSubHeader: true
  };

  status = {0: "Chưa thanh toán", 1: "Đã thanh toán"};
  source: LocalDataSource = new LocalDataSource();
  content_dimiss: string;

  constructor(private service: CustomerService, private dialogService: NbDialogService) {
    const data = [
      {
        name_reminder: "Nguyễn Minh Phong",
        account_reminder: "8492398237874350293",
        account_debt: "80928539384534543",
        money: "1,000.000",
        content_debt: "Trả tiền mừng cưới",
        status: this.status[0]
      },
      {
        name_reminder: "Nguyễn Văn Nam",
        account_reminder: "394893859345934923",
        account_debt: "8492398237874350293",
        money: "20.000",
        content_debt: "Trả tiền xe ôm",
        status: this.status[1]
      },
      {
        name_reminder: "Nguyễn Minh Phong",
        account_reminder: "8492398237874350293",
        account_debt: "2839823948234234025",
        money: "15,000.000",
        content_debt: "Thanh toán nghiệm thu hợp đồng",
        status: this.status[0]
      }
    ];
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    this.dialogService.open(DialogDimissPromptComponent)
      .onClose.subscribe((content: string ) => this.content_dimiss = content);
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

}

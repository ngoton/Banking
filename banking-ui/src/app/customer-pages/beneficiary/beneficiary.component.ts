import { Component, OnInit, OnDestroy } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../_services/customer.service';
import { Customers, Beneficiarys } from '../../_models/customer.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent implements OnInit, OnDestroy {

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
      name: {
        title: 'Tên',
        type: 'string',
      },
      short_name: {
        title: 'Tên gợi nhớ',
        type: 'string',
      },
      account: {
        title: 'Số tài khoản',
        type: 'string',
      }
    },
    hideSubHeader: true
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: CustomerService) {
    this.service.getBeneficiariesData();

    // Subscribe to user Details from UserService
    setTimeout(() => {
      this.service.beneficiaries$
        .pipe(untilDestroyed(this))
        .subscribe((response: Beneficiarys[]) => {
          debugger;
          const data = response;
          this.source.load(data);
        });
    }, 5000);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}

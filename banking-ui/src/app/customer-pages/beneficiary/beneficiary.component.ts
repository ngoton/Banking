import { Component, OnInit, OnDestroy } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../_services/customer.service';
import { Customers, Beneficiarys } from '../../_models/customer.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BenificiaryService } from '../../_services/benificiary.service';
import { HttpErrorResponse } from '@angular/common/http';

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
      confirmSave: true
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
      shortName: {
        title: 'Tên gợi nhớ',
        type: 'string',
      },
      account: {
        title: 'Số tài khoản',
        type: 'string',
      }
    },
    actions: {
      columnTitle: 'Thao tác',
      add: false,
      edit: true,
      delete: true
    //   custom: [
    //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>'},
    //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
    // ],
    //   position: 'right'
    },
    hideSubHeader: true
  };

  source: LocalDataSource = new LocalDataSource();
  benificiariesData: Beneficiarys[];

  constructor(private customerService: CustomerService, private befiniciaryService: BenificiaryService) {
    this.customerService.getBeneficiariesData();

    // Subscribe to user Details from UserService
    setTimeout(() => {
      this.customerService.beneficiaries$
        .pipe(untilDestroyed(this))
        .subscribe((response: Beneficiarys[]) => {
          this.benificiariesData = response;
          this.source.load(this.benificiariesData);
        });
    }, 2000);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Bạn có chắc chắn muốn xóa người này không?')) {
      this.befiniciaryService.delete(event.data.id).pipe(untilDestroyed(this)).subscribe(
        (res: any) => {
          event.confirm.resolve();
        },
        (err: any) => {
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    debugger;
    this.befiniciaryService.update(event.newData).pipe(untilDestroyed(this)).subscribe(
      (res: any) => {
        event.confirm.resolve();
      },
      (err: HttpErrorResponse) => {
        event.confirm.reject();
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}

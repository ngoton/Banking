import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NotifierService } from 'angular-notifier';
import { User } from '../../_models/user';
import { StaffService } from '../../_services/staff.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NbDialogService, NbDateService } from '@nebular/theme';
import { DialogEmployeePromptComponent } from './dialog-employee-prompt/dialog-employee-prompt.component';
import { format } from 'url';

@Component({
  selector: 'ngx-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeManagerComponent implements OnInit, OnDestroy {

  loadingStaffs: boolean = false;
  private readonly notifier: NotifierService;

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
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

  loadingStaff = false;
  source: LocalDataSource = new LocalDataSource();
  staffs: User[] = new Array();

  constructor(private staffService: StaffService,
              private dialogService: NbDialogService) { }

  loadData() {
    this.staffService.all().pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.staffs = success.content;
        this.source.load(this.staffs);
      }
    );
  }

  ngOnInit() {
    this.loadData();
  }

  btnClickAdd() {
    debugger;
    let newUser = new User();

    this.dialogService.open(DialogEmployeePromptComponent, { 
      context: {
        title: 'Thêm mới nhân viên',
        userDetails: newUser
      } 
    }).onClose.subscribe(
      (user: User) => {
        if(user != null){
          this.loadData();
        }
      }
    );
  }

  btnClickEdit(event) {
    debugger;
    this.dialogService.open(DialogEmployeePromptComponent, { 
      context: {
        title: 'Cập nhật nhân viên',
        userDetails: event.data
      } 
    }).onClose.subscribe(
      (user: User) => {
        if(user != null){
          this.loadData();
        }
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Bạn có chắc chắn muốn xóa người này không?")) {
      this.loadingStaff = true;
      this.staffService
        .delete(event.data.id)
        .pipe(untilDestroyed(this))
        .subscribe(
          (res: any) => {
            this.loadingStaff = false;
            event.confirm.resolve();
            this.notifier.show({
              type: "success",
              message: "Xóa thành công!",
              id: "delete-success"
            });
          },
          (err: any) => {
            this.loadingStaff = false;
            event.confirm.reject();
            this.notifier.show({
              type: "error",
              message: `Xóa không thành công! ${err}`,
              id: "delete-error"
            });
          }
        );
    } else {
      event.confirm.reject();
    }
  }

  ngOnDestroy() {

  }

}

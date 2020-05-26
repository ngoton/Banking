import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef, NbDateService } from '@nebular/theme';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { User } from '../../../_models/user';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { mergeMap, finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffService } from '../../../_services/staff.service';

@Component({
  selector: 'ngx-dialog-employee-prompt',
  templateUrl: 'dialog-employee-prompt.component.html',
  styleUrls: ['dialog-employee-prompt.component.scss'],
})
export class DialogEmployeePromptComponent implements OnInit, OnDestroy {

  private readonly notifier: NotifierService;
  submitting = false;
  maxBirthDate: Date;
  employeeForm: FormGroup

  title: string;
  userDetails: User;

  constructor(protected ref: NbDialogRef<DialogEmployeePromptComponent>,
              private staffService: StaffService,
              private fb: FormBuilder,
              private dateService: NbDateService<Date>,
              private notifications: NotifierService) {
                this.notifier = notifications;
                this.maxBirthDate = this.dateService.createDate(this.dateService.today().getFullYear() - 18,0,1);
              }

  createForm() {
    debugger;
    this.employeeForm = this.fb.group({
      firstName: [this.userDetails.firstName, Validators.required],
      lastName: [this.userDetails.lastName, Validators.required],
      birthDate: this.userDetails.birthDate != "" && this.convertDate(this.userDetails.birthDate) || this.maxBirthDate,
      gender: this.userDetails.gender,
      phone: this.userDetails.phone,
      address: this.userDetails.address,
      email: [this.userDetails.email, Validators.required]
    });
  }

  convertDate(dateString: string) {
    const arrDateString: string[] = dateString.split('/');
    const date = this.dateService.createDate(+arrDateString[2], +arrDateString[1], +arrDateString[0]);
    return date;
  }

  cancel() {
    this.ref.close();
  }

  add(formData) {
    debugger;
    this.staffService.all().pipe(untilDestroyed(this),
      mergeMap(
        (success: any) => {
          const arr: [] = success.content;
          const code = Math.max.apply(Math, arr.map(function(o: any) { return o.staffId; })) + 1;
          formData.code = `NV00${code}`;
          formData.birthDate = this.dateService.format(formData.birthDate, "yyyy-MM-dd");
          return this.staffService.add(formData);
        }
      ),
      finalize(() =>{})
    )
    .subscribe(
      (success: any) => {
        this.submitting = false;

        this.notifier.show({
          type: "success",
          message: "Thêm mới thành công!",
          id: "add-success"
        });
        this.ref.close(formData);
      },
      (error: HttpErrorResponse) => {
        this.submitting = false;

        this.notifier.show({
          type: "error",
          message: `Thêm mới thất bại! ${error}`,
          id: "add-error"
        });
      }
    );
  }

  update(formData) {
    formData.code = this.userDetails.code;
    this.staffService.update(formData).pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.submitting = false;

        this.notifier.show({
          type: "success",
          message: "Cập nhật thành công!",
          id: "add-success"
        });
        this.ref.close(formData);
      },
      (error: HttpErrorResponse) => {
        this.submitting = false;

        this.notifier.show({
          type: "error",
          message: `Cập nhật thất bại! ${error}`,
          id: "add-error"
        });
      }
    );
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
  }
}

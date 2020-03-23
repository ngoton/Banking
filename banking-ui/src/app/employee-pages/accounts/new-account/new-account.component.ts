import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'ngx-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit, OnDestroy {

  private readonly notifier: NotifierService;
  customerForm: FormGroup;
  maxBirthDate: Date;

  constructor(private notifications: NotifierService,
              private customerService: CustomerService,
              private fb: FormBuilder,
              private dateService: NbDateService<Date>) {
              this.notifier = notifications;
              this.maxBirthDate = this.dateService.createDate(this.dateService.today().getFullYear() - 18,0,1);
  }

  createForm() {

    this.customerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      birthDate: this.dateService.createDate(this.dateService.today().getFullYear() - 18,0,1),
      gender: "Male",
      phone: "",
      address: "",
      email: ["", Validators.required]
    });
  }

  onSubmit(formData) {
    this.customerService.Add(formData).pipe(untilDestroyed(this))
    .subscribe(
      (success: any) => {
        this.notifier.show({
          type: "success",
          message: "Đăng ký thành công!",
          id: "register-success"
        });
      },
      (error: HttpErrorResponse) => {
        this.notifier.show({
          type: "error",
          message: `Đăng ký thất bại! ${error}`,
          id: "register-error"
        });
      }
    );
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(){}
}

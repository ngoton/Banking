import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { mergeMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewAccountComponent implements OnInit, OnDestroy {

  private readonly notifier: NotifierService;
  customerForm: FormGroup;
  maxBirthDate: Date;
  submitting: boolean = false;

  constructor(private notifications: NotifierService,
              private customerService: CustomerService,
              private fb: FormBuilder,
              private dateService: NbDateService<Date>) {
              this.notifier = notifications;
              this.maxBirthDate = this.dateService.createDate(this.dateService.today().getFullYear() - 18,0,1);
              this.createForm();
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
    this.submitting = true;
    this.customerService.All().pipe(untilDestroyed(this),
      mergeMap(
        (success: any) => {
          const arr: [] = success.content;
          const code = Math.max.apply(Math, arr.map(function(o: any) { return o.customerId; })) + 1;
          formData.code = `KH00${code}`;
          formData.birthDate = this.dateService.format(formData.birthDate, "yyyy-MM-dd");
          return this.customerService.Add(formData);
        }
      ),
      finalize(() =>{})
    )
    .subscribe(
      (success: any) => {
        this.submitting = false;

        this.notifier.show({
          type: "success",
          message: "Đăng ký thành công!",
          id: "register-success"
        });
        this.createForm();
      },
      (error: HttpErrorResponse) => {
        this.submitting = false;

        this.notifier.show({
          type: "error",
          message: `Đăng ký thất bại! ${error}`,
          id: "register-error"
        });
      }
    ); 
  }

  ngOnInit() {
  }

  ngOnDestroy(){}
}

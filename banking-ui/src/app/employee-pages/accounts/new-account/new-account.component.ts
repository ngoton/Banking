import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  customerForm: FormGroup;
  maxBirthDate: Date;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private dateService: NbDateService<Date>) {
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
      email: ""
    });
  }

  onSubmit(formData) {

  }

  ngOnInit() {
    this.createForm();
  }

}

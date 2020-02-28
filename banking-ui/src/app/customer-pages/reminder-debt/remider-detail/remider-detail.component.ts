import { Component, OnInit, OnDestroy } from '@angular/core';
import { DebitService } from '../../../_services/debit.service';
import { Debits, Payment, Customers, AccountInfo } from '../../../_models/customer.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../../../_services/customer.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-remider-detail',
  templateUrl: './remider-detail.component.html',
  styleUrls: ['./remider-detail.component.scss']
})
export class RemiderDetailComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  accountInfo: AccountInfo;
  debitData: Debits = new Debits();
  debits: Debits[] = new Array();

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  source: string;

  constructor(private customerService: CustomerService,
              private debitService: DebitService) {
                debugger;
                this.accountInfo = {
                  name: '',
                  account: '',
                  bankName: ''
                }

                this.source =
                  environment.BASE_URL +
                  environment.ACC_SERV +
                  `?bankName=HCB_BANK&account=`; 
                //this.customerService.getDebitsData();

                setTimeout(()=>{
                  this.loading = true;
                  this.customerService.debits$
                  .pipe(untilDestroyed(this))
                  .subscribe(
                    (debits: Debits[]) => {
                      this.loading = false;
                      this.debits = debits;
                    },
                    (err: any) => {
                      this.loading = false;
                    }
                  );
                }, 2000);
              }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  callBack(data: any): void {
    if(data != null){
      this.accountInfo = data;
    }
    else{
      this.accountInfo = {
        name: '',
        account: '',
        bankName: ''
      };
    }
    
  }

  sendDebit() {
    this.loading = true;
    this.debitService.add(this.debitData).pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        this.loading = false;
        // Nếu gửi yêu cầu đến server thành công thì server sẽ trả kết quả đúng trong đây

      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        // Nếu lỗi thì server sẽ trả lỗi về đây
      }
    );
  }

  accountChange(item) {
    this.customerService.getAccountInfo(item.account, "HCB_BANK")
    .pipe(untilDestroyed(this))
    .subscribe(
      (acc: AccountInfo) => {
        this.accountInfo = acc;
      }
    );
  }

}

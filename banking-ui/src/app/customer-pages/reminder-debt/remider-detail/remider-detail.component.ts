import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DebitService } from '../../../_services/debit.service';
import { Debits, Payment, Customers, AccountInfo } from '../../../_models/customer.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../../../_services/customer.service';
import { environment } from '../../../../environments/environment';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationSocketService } from '../../../_services/notification-socket.service';

@Component({
  selector: 'ngx-remider-detail',
  templateUrl: './remider-detail.component.html',
  styleUrls: ['./remider-detail.component.scss']
})
export class RemiderDetailComponent implements OnInit, OnDestroy {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private readonly notifi: NotifierService;

  loading: boolean = false;
  client: any;
  notifyService: any;
  private destroy$: Subject<void> = new Subject<void>();
  accountInfo: AccountInfo;
  debitData: Debits = new Debits();
  debits: Debits[] = new Array();

  public keypadNumbers = ['10.000', '20.000', '50.000', '100.000', '500.000', '1,000.000', '2,000.000', '3,000.000'];
  amountSubmitted = false;
  source: string;

  constructor(private customerService: CustomerService,
              private debitService: DebitService,
              private notifications: NotifierService,
              private notificationSocketService: NotificationSocketService) {
                debugger;
                this.notifyService = notificationSocketService;

                this.accountInfo = {
                  name: '',
                  account: '',
                  bankName: ''
                }
                this.notifi = notifications;

                this.source =
                  environment.BASE_URL +
                  environment.ACC_SERV +
                  `?bankName=HCB_BANK&account=`; 
                
              }

  ngOnInit() {
    this.client = this.notifyService.Connection();
    this.customerService.getDebitsData();
    
    this.loading = true;
    this.customerService.debits$.pipe(takeUntil(this.destroy$))
      .subscribe(
        (debits: Debits[]) => {
          this.debits = debits.filter(
            (debit, i, arr) => arr.findIndex(x => x.account === debit.account) === i
           );
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
        
        this.notifi.show({
          id: `debit`,
          message: `Đã gửi nhắc nợ`,
          type: `info`,
          template: this.customNotificationTmpl
        });
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        this.notifi.show({
          id: `debitError`,
          message: `Không gửi được nhắc nợ`,
          type: `error`,
          template: this.customNotificationTmpl
        });
        // Nếu lỗi thì server sẽ trả lỗi về đây
      }
    );
  }

  sendNotify(creditData) {
    var userInfo = JSON.parse(localStorage.getItem("userDetails"));

    const notification = {
      sender: userInfo.username,
      message: creditData.content
    }

    const PATH = "/app" + this.notifyService.topic + userInfo.username;

    this.client.connect({}, frame => {
      console.log("Connected: ", frame);
      this.client.send(PATH, {}, JSON.stringify(notification));
    }, (err: any) => {
      console.log("errorCallBack -> " + err)
      setTimeout(() => {
        this.sendNotify(creditData);
      }, 5000);
    });
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

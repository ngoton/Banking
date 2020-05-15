import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbDialogService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService } from '../../../_services/user.service';
import { CustomerService } from '../../../_services/customer.service';
import { User } from '../../../_models/user';
import { Customers } from '../../../_models/customer.model';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { NotificationSocketService } from '../../../_services/notification-socket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-ibanking-customer-header',
  styleUrls: ['./ibanking-customer-header.component.scss'],
  templateUrl: './ibanking-customer-header.component.html',
})
export class IBankingCustomerHeaderComponent implements OnInit, OnDestroy {
  loading = false;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  // user: any;
  user: any;
  customerInfo: User = new User();
  client: any;
  notifications: any[] = new Array();
  countNotify: number = 0;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Đổi mật khẩu' }, { title: 'Đăng xuất' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private authService: AuthService,
              private userService: UserService,
              private customerService: CustomerService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,
              private notificationService: NotificationSocketService) {
                this.notificationService = new NotificationSocketService();
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.client = this.notificationService.Connection();

    this.user = JSON.parse(localStorage.getItem('userDetails'));
    switch(this.user.role){
      case 'USER':
        setTimeout(() => {
          this.userService.getCustomerInfor(this.user.userId)
          .pipe(untilDestroyed(this)).subscribe(
            (res: any) => {
              this.customerInfo = res;
              localStorage.setItem("customerInfo", JSON.stringify(this.customerInfo));
              if(!this.customerInfo.avatar) {
                this.customerInfo.avatar = 'assets/images/placeholder.png';
              }
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }
          );
        }, 2000)
        break;
    }

    this.customerService.getAcctDetailsData();
    this.subscribeToServer();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'ibanking-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        debugger;
        switch(title){
          case 'Đăng xuất':
            this.authService.ibankLogout();
            this.router.navigate(['/onboarding/login']);
            break;
          case 'Đổi mật khẩu':
            this.router.navigate(['/onboarding/change-password']);
            break;
        }
      });
  }

  subscribeToServer() {
    var userInfo = JSON.parse(localStorage.getItem("userDetails"));

    this.client.connect({}, frame => {
      console.log("Connected: ", frame);
      this.client.subscribe(this.notificationService.topic + userInfo.username, 
        message => {
          this.notifications.push(JSON.parse(message.body));
          this.countNotify = this.notifications.length;
          console.log("notification: ", this.notifications);
      }, function(error){
        alert("STOMP error" + error);
      })
    }, (err: any) => {
      console.log("errorCallBack -> " + err)
      setTimeout(() => {
        this.subscribeToServer();
      }, 5000);
    });
  }

  notifyClicked(){
    this.countNotify = 0;
  }
  goTo(){
    this.router.navigate(['/customer/reminder-debt']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}

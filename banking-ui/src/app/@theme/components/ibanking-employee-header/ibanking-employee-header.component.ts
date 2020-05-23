import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService } from '../../../_services/user.service';
// import { EmployeeService } from '../../../_services/employee.service';
import { User } from '../../../_models/user';
// import { employees } from '../../../_models/employee.model';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-ibanking-employee-header',
  styleUrls: ['./ibanking-employee-header.component.scss'],
  templateUrl: './ibanking-employee-header.component.html',
})
export class IBankingEmployeeHeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  staffInfor: User = new User();

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
              // private employeeService: EmployeeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router) {
  }

  ngOnInit() {
    debugger;
    this.currentTheme = this.themeService.currentTheme;

    this.user = JSON.parse(localStorage.getItem('userDetails'));
    switch(this.user.role){
      case 'ADMIN':
        this.staffInfor = {
          staffId: 1,
          code: "AD001",
          firstName: "Administrator ",
          lastName: "HCB Bank",
          birthDate: "",
          gender: "Male",
          phone: "190032738",
          address: "Anonymous"
        }
        localStorage.setItem("staffInfo", JSON.stringify(this.staffInfor));
        if(!this.staffInfor.avatar) {
          this.staffInfor.avatar = 'assets/images/placeholder.png';
        }
        break;   
      case 'STAFF':
        setTimeout(() => {
          this.userService.getStaffInfor(this.user.userId)
          .pipe(takeUntil(this.destroy$)).subscribe(
            (res: any) => {
              this.staffInfor = res;
              localStorage.setItem("staffInfo", JSON.stringify(this.staffInfor));
              if(!this.staffInfor.avatar) {
                this.staffInfor.avatar = 'assets/images/placeholder.png';
              }      
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }
          );
        }, 2000)
        break;
    }

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
        takeUntil(this.destroy$)
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

import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { MenuItems } from '../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { CustomerService } from './_customer-service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'visible',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '280px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {
  // session management properties
  idleState = 'NOT_STARTED';
  timedOut = true;
  lastPing?: Date = null;
  count: number;
  countMinutes: number;
  countSeconds: number;
  progressCount: number;
  closeTimeOutModal = false;
  srcUrl: string;
  email: string;
  fullName: string;
  phoneNumber: string;


  randomNumber: number;
  user: User;
  displayName: string;
  acctToDebitFX: any;
  public animateSidebar: string;
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;
  public branchArray: string[];
  public branchLocation: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public chatSlideInOut: string;
  public innerChatSlideInOut: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public windowWidth: number;
  public chatTopPosition: string;

  public toggleOn: boolean;
  public toggleIcon: string;
  public navBarTheme: string;
  public activeItemTheme: string;
  public pcodedSidebarPosition: string;

  public headerFixedTop: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public configOpenRightBar: string;
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public sidebarFixedNavHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  public isCollapsedSideBar: string;
  public psDisabled: string;
  public perfectDisable: string;

  scroll = (): void => {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 50) {
      if (this.isSidebarChecked === true) {
        this.pcodedSidebarPosition = 'fixed';
      }
      this.headerFixedTop = '0';
      this.sidebarFixedNavHeight = '100%';
    } else {
      this.headerFixedTop = 'auto';
      this.pcodedSidebarPosition = 'absolute';
      this.sidebarFixedNavHeight = '';
    }
  }


  // FOR YOU: TO REDIRECT USER
  redirect(url) {
    window.open(url);
  }

  constructor(public menuItems: MenuItems, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  // Session Management
  ngOnDestroy() {
    this.timedOut = true;
    // this.resetTimeOut();
  }

}

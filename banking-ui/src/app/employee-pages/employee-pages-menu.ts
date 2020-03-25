import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tạo tài khoản',
    icon: 'plus',
    link: '/employee/accounts/new-account',
    home: true,
  },
  {
    title: 'Nạp tiền',
    icon: 'log-in',
    link: '/employee/deposit-account',
  },
  {
    title: 'Xem lịch sử giao dịch',
    icon: 'clipboard',
    link: '/employee/transaction-history',
  }
];

export const MENU_ADMIN_ITEMS: NbMenuItem[] = [
  {
    title: 'Quản lý nhân viên',
    icon: 'list',
    link: '/employee/employee-manager',
  }
];

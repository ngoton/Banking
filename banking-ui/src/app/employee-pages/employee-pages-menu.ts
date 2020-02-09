import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tài khoản người dùng',
    icon: 'credit-card',
    link: '/employee/accounts',
    home: true,
  },
  {
    title: 'Quản lý người thụ hưởng',
    icon: 'people',
    link: '/customer/beneficiary',
  },
  {
    title: 'Chuyển khoản',
    icon: 'corner-down-left',
    link: '/customer/transfer',
  },
  {
    title: 'Quản lý nhắc nợ',
    icon: 'volume-up',
    children: [
      {
        title: 'Tạo nhắc nợ',
        link: '/customer/reminder-debt/new'
      },
      {
        title: 'Danh sách nhắc nợ',
        link: '/customer/reminder-debt'
      }
    ],
  },
  {
    title: 'Lịch sử giao dịch',
    icon: 'clipboard',
    link: '/customer/transaction-history',
  }
];

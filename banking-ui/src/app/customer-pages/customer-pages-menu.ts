import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tài khoản',
    icon: 'credit-card',
    link: '/customer/accounts',
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
    link: '/customer/debt-reminder',
  },
  {
    title: 'Quản lý giao dịch',
    icon: 'clipboard',
    link: '/customer/bill-payment',
  }
];

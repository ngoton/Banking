import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tài khoản',
    icon: 'credit-card',
    link: '/customer-pages/accounts',
    home: true,
  },
  {
    title: 'Quản lý người thụ hưởng',
    icon: 'people',
    link: '/customer-pages/beneficiary',
  },
  {
    title: 'Chuyển khoản',
    icon: 'corner-down-left',
    link: '/customer-pages/tranfer',
  },
  {
    title: 'Quản lý nhắc nợ',
    icon: 'volume-up',
    link: '/customer-pages/debt-reminder',
  },
  {
    title: 'Quản lý giao dịch',
    icon: 'clipboard',
    link: '/customer-pages/bill-payment',
  }
];

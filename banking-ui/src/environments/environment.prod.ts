/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  BANK_NAME: 'HCB_BANK',
  AUX_BENEFICIARY: '/internal/beneficiaries',
  AUX_URL: '',
  BASE_URL: 'https://banking-hcmus.herokuapp.com',
  AUTH_SERV: '/auth',
  USER_SERV: '/internal/users',
  STAFF_SERV: '/internal/staffs',
  ACC_SERV: '/internal/accounts',
  CUST_SERV: '/internal/customers',
  SAVING_SERV: '/internal/savings',
  PAYMENT_SERV: '/internal/payments',
  PARTNER_SERV: '/internal/partners',
  TRANSF_SERV: '/internal/paymentTransaction',
  TRANSF_SAVING_SERV: '/internal/savingTransaction',
  DEBIT_SERV: '/internal/debits',
  CREDIT_SERV: '/internal/credits',
  REQ_SERV: '',
  CHANNEL: '',
  CHANNEL_SHORTNAME: '',
  ENV_NAME: '',
  ATM_LIMIT: '',
  PUB_ENC_KEY: ``,
  PUB_IBANK_ENC_KEY: ``,
  PRIV_ENC_KEY: ``,
};

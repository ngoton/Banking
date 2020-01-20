import { AcctDetails } from '../customer/_customer-model/customer.model';

export class User {

  constructor(
    public id?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public role?: string,
    public acctDetails?: AcctDetails[]
  ) { }

}

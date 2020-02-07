import { Customers } from './customer.model';

export class User {

  constructor(
    public id?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public avatar?: string, 
    public role?: string,
    public customer?: Customers
  ) { }

}

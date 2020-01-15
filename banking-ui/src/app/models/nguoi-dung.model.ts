export class NguoiDung {
    Id: number;
    Name: string;
    UserName: string;
    Email: string;
    Address: IAddress;
    Phone: string;
    Website: string;
    Company: ICompany;
  
    constructor(nguoiDung?)
      {
        nguoiDung = nguoiDung || {};
          this.Id = nguoiDung.Id || null,
          this.Name = nguoiDung.Name || '',
          this.UserName = nguoiDung.UserName || '',
          this.Email = nguoiDung.Email || '',
          this.Address = nguoiDung.Address || null,
          this.Phone = nguoiDung.Phone || '',
          this.Website = nguoiDung.Website || '',
          this.Company = nguoiDung.Company || null

      }
  }

export interface IAddress {
  Street?: string;
  Suite?: string;
  City?: string;
  ZipCode?: string;
}

export interface ICompany {
  Name?: string;
  CatchPhrase?: string;
  BS?: string;
}
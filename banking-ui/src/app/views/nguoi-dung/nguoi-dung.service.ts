import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NguoiDung } from '../../models/nguoi-dung.model';
import { ResourceService } from '../../resource.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class NguoiDungService extends ResourceService<NguoiDung> {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient, 'users');
   }
}

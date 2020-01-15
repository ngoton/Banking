import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiDungService } from './nguoi-dung.service'

import { NguoiDungRoutingModule } from './nguoi-dung-routing.module';
import { from } from 'rxjs';
import { NguoiDungComponent } from './nguoi-dung.component';
import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { ThongTinNguoiDungComponent } from './thong-tin-nguoi-dung/thong-tin-nguoi-dung.component';


@NgModule({
  declarations: [NguoiDungComponent, DanhSachNguoiDungComponent, ThongTinNguoiDungComponent],
  imports: [
    CommonModule,
    NguoiDungRoutingModule
  ],
  providers: [
    NguoiDungService
  ]
})
export class NguoiDungModule { }

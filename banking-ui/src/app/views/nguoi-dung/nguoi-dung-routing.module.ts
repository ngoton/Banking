import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NguoiDungComponent } from './nguoi-dung.component';
import { DanhSachNguoiDungComponent } from './danh-sach-nguoi-dung/danh-sach-nguoi-dung.component';
import { ThongTinNguoiDungComponent } from './thong-tin-nguoi-dung/thong-tin-nguoi-dung.component';

const routes: Routes = [
  {
    path: '',
    component: NguoiDungComponent,
    children: [
      {path: '', component: DanhSachNguoiDungComponent},
      {path: ':id', component: ThongTinNguoiDungComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NguoiDungRoutingModule { }

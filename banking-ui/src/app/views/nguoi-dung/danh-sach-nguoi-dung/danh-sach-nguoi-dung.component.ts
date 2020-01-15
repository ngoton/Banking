import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NguoiDungService } from '../nguoi-dung.service'
import { FilesDataSource } from '../../../resource.class';
import { Router, ActivatedRoute } from '@angular/router';
import { NguoiDung } from '../../../models/nguoi-dung.model';

@Component({
  selector: 'app-danh-sach-nguoi-dung',
  templateUrl: './danh-sach-nguoi-dung.component.html',
  styleUrls: ['./danh-sach-nguoi-dung.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DanhSachNguoiDungComponent implements OnInit {

  nguoiDungs: NguoiDung[];
  dataSource: FilesDataSource<NguoiDungService> | null;

  constructor(
      private _nguoiDungService: NguoiDungService, 
      private _activeR: ActivatedRoute, 
      private _router: Router
  ) { }

  ngOnInit(): void {
    this._nguoiDungService.all().subscribe(
      users => {
        this.nguoiDungs = users;
      }
    );
  }

}

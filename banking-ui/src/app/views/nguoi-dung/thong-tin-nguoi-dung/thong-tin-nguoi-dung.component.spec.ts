import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinNguoiDungComponent } from './thong-tin-nguoi-dung.component';

describe('ThongTinNguoiDungComponent', () => {
  let component: ThongTinNguoiDungComponent;
  let fixture: ComponentFixture<ThongTinNguoiDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinNguoiDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

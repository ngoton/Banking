import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTypeComponent } from './transfer-type.component';

describe('TransferTypeComponent', () => {
  let component: TransferTypeComponent;
  let fixture: ComponentFixture<TransferTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

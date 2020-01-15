import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TikiLayoutComponent } from './tiki-layout.component';

describe('TikiLayoutComponent', () => {
  let component: TikiLayoutComponent;
  let fixture: ComponentFixture<TikiLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TikiLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TikiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

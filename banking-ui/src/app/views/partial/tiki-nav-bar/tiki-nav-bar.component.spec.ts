import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TikiNavBarComponent } from './tiki-nav-bar.component';

describe('TikiNavBarComponent', () => {
  let component: TikiNavBarComponent;
  let fixture: ComponentFixture<TikiNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TikiNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TikiNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

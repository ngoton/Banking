import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePagesComponent } from './employee-pages.component';

describe('EmployeePagesComponent', () => {
  let component: EmployeePagesComponent;
  let fixture: ComponentFixture<EmployeePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

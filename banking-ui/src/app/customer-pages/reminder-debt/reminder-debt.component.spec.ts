import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderDebtComponent } from './reminder-debt.component';

describe('ReminderDebtComponent', () => {
  let component: ReminderDebtComponent;
  let fixture: ComponentFixture<ReminderDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

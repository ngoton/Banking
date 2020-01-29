import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemiderDetailComponent } from './remider-detail.component';

describe('RemiderDetailComponent', () => {
  let component: RemiderDetailComponent;
  let fixture: ComponentFixture<RemiderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemiderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemiderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

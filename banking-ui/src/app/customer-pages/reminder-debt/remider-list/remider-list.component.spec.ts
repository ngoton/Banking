import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemiderListComponent } from './remider-list.component';

describe('RemiderListComponent', () => {
  let component: RemiderListComponent;
  let fixture: ComponentFixture<RemiderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemiderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemiderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

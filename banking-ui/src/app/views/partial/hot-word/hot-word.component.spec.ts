import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotWordComponent } from './hot-word.component';

describe('HotWordComponent', () => {
  let component: HotWordComponent;
  let fixture: ComponentFixture<HotWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

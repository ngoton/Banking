import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbTrackitComponent } from './ib-trackit.component';

describe('IbTrackitComponent', () => {
  let component: IbTrackitComponent;
  let fixture: ComponentFixture<IbTrackitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbTrackitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbTrackitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

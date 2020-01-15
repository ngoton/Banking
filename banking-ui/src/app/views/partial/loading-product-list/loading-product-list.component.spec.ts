import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingProductListComponent } from './loading-product-list.component';

describe('LoadingProductListComponent', () => {
  let component: LoadingProductListComponent;
  let fixture: ComponentFixture<LoadingProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

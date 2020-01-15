import { TestBed } from '@angular/core/testing';

import { NguoiDungService } from './nguoi-dung.service';

describe('NguoiDungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NguoiDungService = TestBed.get(NguoiDungService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BenificiaryService } from './benificiary.service';

describe('BenificiaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BenificiaryService = TestBed.get(BenificiaryService);
    expect(service).toBeTruthy();
  });
});

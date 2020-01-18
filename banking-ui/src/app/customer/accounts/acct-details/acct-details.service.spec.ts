import { TestBed } from '@angular/core/testing';

import { AcctDetailsService } from './acct-details.service';

describe('AcctDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcctDetailsService = TestBed.get(AcctDetailsService);
    expect(service).toBeTruthy();
  });
});

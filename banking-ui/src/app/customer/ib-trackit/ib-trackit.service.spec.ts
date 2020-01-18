import { TestBed } from '@angular/core/testing';

import { IbTrackitService } from './ib-trackit.service';

describe('IbTrackitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbTrackitService = TestBed.get(IbTrackitService);
    expect(service).toBeTruthy();
  });
});

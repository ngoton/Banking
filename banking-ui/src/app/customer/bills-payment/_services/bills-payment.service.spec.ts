import { TestBed } from '@angular/core/testing';

import { BillsPaymentService } from './bills-payment.service';

describe('BillsPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillsPaymentService = TestBed.get(BillsPaymentService);
    expect(service).toBeTruthy();
  });
});

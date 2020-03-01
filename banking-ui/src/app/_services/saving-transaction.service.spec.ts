import { TestBed } from '@angular/core/testing';

import { SavingTransactionService } from './saving-transaction.service';

describe('SavingTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingTransactionService = TestBed.get(SavingTransactionService);
    expect(service).toBeTruthy();
  });
});

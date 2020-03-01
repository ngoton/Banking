import { TestBed } from '@angular/core/testing';

import { NotificationSocketService } from './notification-socket.service';

describe('NotificationSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationSocketService = TestBed.get(NotificationSocketService);
    expect(service).toBeTruthy();
  });
});

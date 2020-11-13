import { TestBed } from '@angular/core/testing';

import { WykopczanGuard } from './wykopczan.guard';

describe('WykopczanGuard', () => {
  let guard: WykopczanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WykopczanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

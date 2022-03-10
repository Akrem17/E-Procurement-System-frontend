import { TestBed } from '@angular/core/testing';

import { PreventLoggedInAccessGuard } from './prevent-logged-in-access.guard';

describe('PreventLoggedInAccessGuard', () => {
  let guard: PreventLoggedInAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventLoggedInAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

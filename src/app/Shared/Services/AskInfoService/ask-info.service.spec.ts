import { TestBed } from '@angular/core/testing';

import { AskInfoService } from './ask-info.service';

describe('AskInfoService', () => {
  let service: AskInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

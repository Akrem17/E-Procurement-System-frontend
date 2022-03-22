import { TestBed } from '@angular/core/testing';

import { TenderClassificationService } from './tender-classification.service';

describe('TenderClassificationService', () => {
  let service: TenderClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

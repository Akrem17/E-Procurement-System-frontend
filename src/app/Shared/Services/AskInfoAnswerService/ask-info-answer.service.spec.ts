import { TestBed } from '@angular/core/testing';

import { AskInfoAnswerService } from './ask-info-answer.service';

describe('AskInfoAnswerService', () => {
  let service: AskInfoAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskInfoAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { MessageBarService } from './message-bar.service';

describe('MessageBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBarService]
    });
  });

  it('should be created', inject([MessageBarService], (service: MessageBarService) => {
    expect(service).toBeTruthy();
  }));
});

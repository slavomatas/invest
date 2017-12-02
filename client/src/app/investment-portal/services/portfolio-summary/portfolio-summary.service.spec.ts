import { TestBed, inject } from '@angular/core/testing';

import { PortfolioSummaryService } from './portfolio-summary.service';

describe('PortfolioSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioSummaryService]
    });
  });

  it('should be created', inject([PortfolioSummaryService], (service: PortfolioSummaryService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { DashboardSummaryService } from './portfolio-summary.service';

describe('DashboardSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardSummaryService]
    });
  });

  it('should be created', inject([DashboardSummaryService], (service: DashboardSummaryService) => {
    expect(service).toBeTruthy();
  }));
});

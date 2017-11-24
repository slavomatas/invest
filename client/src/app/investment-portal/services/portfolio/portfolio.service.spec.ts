import { TestBed, inject } from '@angular/core/testing';

import { MockDashboardSummaryService } from './dashboard-summary.service';
import { IDashboardSummaryService } from './idashboard-summary-service';

describe('DashboardSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MockDashboardSummaryService,
          useFactory: () =>  new MockDashboardSummaryService()
        }
      ]
    });
  });

  it('should be created', inject([MockDashboardSummaryService], (service: IDashboardSummaryService) => {
    expect(service).toBeTruthy();
  }));

});

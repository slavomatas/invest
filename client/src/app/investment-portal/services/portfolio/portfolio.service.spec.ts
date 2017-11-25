import { TestBed, inject } from '@angular/core/testing';
import { IPortfolioService } from './i-portfolio.service';
import { MockPortfolioService } from './portfolio.service';



describe('DashboardSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MockPortfolioService,
          useFactory: () =>  new MockPortfolioService()
        }
      ]
    });
  });

  it('should be created', inject([MockPortfolioService], (service: IPortfolioService) => {
    expect(service).toBeTruthy();
  }));

});

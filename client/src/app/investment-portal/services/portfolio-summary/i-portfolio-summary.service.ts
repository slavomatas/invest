import { ChartModelPortfolio, PortfolioSummary } from '../../types/types';
import { Observable } from 'rxjs/Observable';

export interface IDashboardSummaryService {
  computeSummary(): Observable<PortfolioSummary>;
}

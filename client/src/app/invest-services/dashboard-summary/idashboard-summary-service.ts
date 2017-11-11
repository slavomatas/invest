import { Portfolio, PortfolioMeasure } from '../../types/types';

export interface IDashboardSummaryService {
  getPortfolios(): Promise<Portfolio[]>;
  getPortfolioCumulativeMeasure(portfolioId: string, dateFrom?: Date, dateTo?: Date): Promise<PortfolioMeasure[]>;
}

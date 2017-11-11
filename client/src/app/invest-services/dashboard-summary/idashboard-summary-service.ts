import { Portfolio, CumulativeMeasurement } from '../../types/types';

export interface IDashboardSummaryService {
  getPortfolios(): Promise<Portfolio[]>;
  getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Promise<CumulativeMeasurement[]>;
}

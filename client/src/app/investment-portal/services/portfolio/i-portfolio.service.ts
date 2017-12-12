import { Portfolio } from '../../types/types';
import { CumulativeMeasurement } from '../../types/dashboard-types';
import { Observable } from 'rxjs/Observable';

export interface IPortfolioService {
  getPortfolios(): Observable<Portfolio[]>;
  getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]>;
}

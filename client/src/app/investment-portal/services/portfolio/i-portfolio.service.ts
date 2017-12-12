import {Portfolio, CumulativeMeasurement, PortfolioDetails} from '../../types/types';
import { Observable } from 'rxjs/Observable';

export interface IPortfolioService {
  getPortfolios(): Observable<Portfolio[]>;
  getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]>;
  getPortfolioDetails(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<PortfolioDetails[]>;
}

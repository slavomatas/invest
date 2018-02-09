import {
  Portfolio, PortfolioDetails, TypeOfReturns, CumulativeMeasurement,
  TypeOfPortfolioReturn,
  PortfolioPosition
} from '../../types/types';
import { PortfolioReturn } from '../../types/dashboard-types';
import { Observable } from 'rxjs/Observable';

export interface IPortfolioService {
  getPortfolios(): Promise<Portfolio[]>;
  getCumulativeMeasurements(portfolioId: number, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]>;
  getPortfolioReturn(portfolioId: number, portfolioReturnType: TypeOfPortfolioReturn, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]>;
  getPortfolioPositions(portfolio: PortfolioDetails): Promise<PortfolioPosition[]>;
  closePortfolio(portfolio: PortfolioDetails): Promise<PortfolioDetails>;
}

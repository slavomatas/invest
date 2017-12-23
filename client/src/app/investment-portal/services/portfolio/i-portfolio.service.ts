import {
  Portfolio, CumulativeMeasurement, PortfolioDetails, TypeOfReturns, PortfolioReturn,
  TypeOfPortfolioReturn
} from '../../types/types';
import { Observable } from 'rxjs/Observable';

export interface IPortfolioService {
  getPortfolios(): Promise<Portfolio[]>;
  getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]>;
  getPortfolioReturn(portfolioId: string, portfolioReturnType: TypeOfPortfolioReturn, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]>;
  getPortfolioMarketValue(portfolioId: string, date?: Date): Observable<number>;
  getPortfolioPositions(portfolioId: string): Observable<number>;
  getPortfoliosListDetails(portfolioReturnType: TypeOfPortfolioReturn): Promise<PortfolioDetails[]>;
}

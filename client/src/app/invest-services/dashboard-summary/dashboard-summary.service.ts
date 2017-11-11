import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpParams, HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { IDashboardSummaryService } from './idashboard-summary-service';
import { Portfolio, PortfolioMeasure } from '../../types/types';

const GET_PORTFOLIOS_URL = 'https://www.invest.strazprirody.org/api/getPortfolioMeasure';
const GET_PORTFOLIO_CUMULATIVE_MEASURE_URL = 'measurements/cumulativeMeasurement';

@Injectable()
export class DashboardSummaryService implements IDashboardSummaryService {
  constructor(private http: HttpClient) {}

  public getPortfolios(): Promise<Portfolio[]> {
    return this.http
      .get<Portfolio[]>(GET_PORTFOLIOS_URL)
      .toPromise();
  }

  public getPortfolioCumulativeMeasure(portfolioId: string, dateFrom?: Date, dateTo?: Date): Promise<PortfolioMeasure[]> {
    const params: HttpParams = new HttpParams();
    params.set('portfolioId', portfolioId);
    params.set('dateFrom', dateFrom.toDateString());
    params.set('dateTo', dateTo.toDateString());

    return this.http
    .get<PortfolioMeasure[]>(GET_PORTFOLIO_CUMULATIVE_MEASURE_URL, {
      params: params
    })
    .toPromise();
  }
}

export class MockDashboardSummaryService implements IDashboardSummaryService {

  public getPortfolios(): Promise<Portfolio[]> {
    return new Promise<Portfolio[]>((resolve) => {
      setTimeout(
        () => {
          resolve([
            {name: 'Mock portfolio 1', id: 'i1'},
            {name: 'Mock portfolio 1', id: 'i2'},
            {name: 'Mock portfolio 1', id: 'i3'},
            {name: 'Mock portfolio 1', id: 'i14'}
          ]);
        },
        500);

    });
  }

  public getPortfolioCumulativeMeasure(portfolioId: string, dateFrom?: Date, dateTo?: Date): Promise<PortfolioMeasure[]> {
    return new Promise<PortfolioMeasure[]>((resolve) => {
      setTimeout(
        () => {
          resolve([
            {date: new Date(), value: 'val1'},
            {date: new Date(), value: 'val2'},
            {date: new Date(), value: 'val3'},
            {date: new Date(), value: 'val4'},
            {date: new Date(), value: 'val5'},
            {date: new Date(), value: 'val6'}
          ]);
        },
        500);

    });
  }
}

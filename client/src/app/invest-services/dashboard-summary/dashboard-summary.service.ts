import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpParams, HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { IDashboardSummaryService } from './idashboard-summary-service';
import { Portfolio, CumulativeMeasurement } from '../../types/types';

const GET_PORTFOLIOS_URL = 'https://www.invest.strazprirody.org/api/getPortfolios';
const GET_PORTFOLIO_CUMULATIVE_MEASURE_URL = 'https://www.invest.strazprirody.org/api/getPortfolioMeasure';

@Injectable()
export class DashboardSummaryService implements IDashboardSummaryService {
  constructor(private http: HttpClient) {}

  public getPortfolios(): Promise<Portfolio[]> {
    return this.http
      .get<Portfolio[]>(GET_PORTFOLIOS_URL)
      .toPromise();
  }

  public getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Promise<CumulativeMeasurement[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('portfolioId', portfolioId);

    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toDateString());
    }

    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toDateString());
    }

    console.log(portfolioId);
    return this.http
    .get<CumulativeMeasurement[]>(GET_PORTFOLIO_CUMULATIVE_MEASURE_URL, {
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

  public getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Promise<CumulativeMeasurement[]> {
    return new Promise<CumulativeMeasurement[]>((resolve) => {
      setTimeout(
        () => {
          resolve([
            {name: 'name1', value: 'val1'},
            {name: 'name2', value: 'val2'},
            {name: 'name3', value: 'val3'},
            {name: 'name4', value: 'val4'},
            {name: 'name5', value: 'val5'},
            {name: 'name6', value: 'val6'}
          ]);
        },
        500);

    });
  }
}

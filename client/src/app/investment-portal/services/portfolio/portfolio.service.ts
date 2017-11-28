import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Portfolio, CumulativeMeasurement, ChartModelPortfolio } from '../../types/types';
import { IPortfolioService } from './i-portfolio.service';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../../store';
import { cloneDeep } from 'lodash';
import {isUndefined} from "util";

const GET_PORTFOLIOS_URL = 'https://www.invest.strazprirody.org/api/getPortfolios';
const GET_PORTFOLIO_CUMULATIVE_MEASURE_URL = 'https://www.invest.strazprirody.org/api/getPortfolioMeasure';

@Injectable()
export class PortfolioService implements IPortfolioService {

  chartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);
  oldPortfolioChart: ChartModelPortfolio[] = [];

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<AppState>) {

    this.chartPortfolios$.subscribe((data: ChartModelPortfolio[]) => {
      if (data != null && data.length > 0) {
        this.oldPortfolioChart = cloneDeep(data);
      }
    });

  }

  /**
   * Fetches cumulative data for all portfolios
   */
  public async getPortfoliosCumulativeData(): Promise<ChartModelPortfolio[]> {

    let promises: Promise<ChartModelPortfolio>[];

    await this.getPortfolios().toPromise().then(async (portfolios: Portfolio[]) => {
      promises = portfolios.map(async (portfolio: Portfolio) => {
        return await this.getCumulativeDataForPortfolio(portfolio);
      });
    });

    let res;
    await Promise.all(promises).then((cumulativeData: ChartModelPortfolio[]) => {
      res = cumulativeData;
    });

    return res;
  }

  /**
   * Fetches cumulative data for given portfolio
   * @param portfolio portfolio to get cumulative data for
   */
  public async getCumulativeDataForPortfolio(portfolio: Portfolio): Promise<ChartModelPortfolio> {

    let selectedState: ChartModelPortfolio[] = this.oldPortfolioChart.filter(x => x.id == portfolio.id);

    const portfolioChart: ChartModelPortfolio = {
      name: portfolio.name,
      id: portfolio.id,
      selected: selectedState.length > 0 ? selectedState[0].selected : true,
      series: []
    };

    await this.getCumulativeMeasurements(portfolio.id).toPromise().then((measurements: CumulativeMeasurement[]) => {

       measurements.map((measurement: CumulativeMeasurement) => {
        portfolioChart.series.push({
          name: measurement.name,
          value: Number.parseFloat(measurement.value)
        });
      });
    });

    return portfolioChart;
  }

  /**
   * @description Gets all portfolios for user.
   * @returns {Observable<Portfolio[]>}
   */
  public getPortfolios(): Observable<Portfolio[]> {
    return this.http
      .get<Portfolio[]>(GET_PORTFOLIOS_URL);
  }

  /**
  * @description Fetches Cumulative Measurements for given portfolio id
  *
  * @param {string} portfolioId Id of portfolio to fetch Cumulative Measurements for
  * @param {Date} [dateFrom] Date from which measurements should be returned
  * @param {Date} [dateTo] Date to which measurements should be returned
  * @returns {Observable<CumulativeMeasurement[]>}
  * @memberof IDashboardSummaryService
  */
  public getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('portfolioId', portfolioId);

    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toISOString());
    }

    return this.http
      .get<CumulativeMeasurement[]>(GET_PORTFOLIO_CUMULATIVE_MEASURE_URL, {
        params: params
      });
  }
}

export class MockPortfolioService implements IPortfolioService {

  public getPortfolios(): Observable<Portfolio[]> {

    return new Observable<Portfolio[]>(observer => {
      setTimeout(
        () => {
          observer.next(
            [
              { name: 'Mock portfolio 1', id: 'i1' },
              { name: 'Mock portfolio 1', id: 'i2' },
              { name: 'Mock portfolio 1', id: 'i3' },
              { name: 'Mock portfolio 1', id: 'i14' }
            ]
          );
        },
        500);
    });
  }

  public getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]> {


    return new Observable<CumulativeMeasurement[]>(observer => {
      setTimeout(
        () => {
          observer.next(
            [
              { name: 'name1', value: 'val1' },
              { name: 'name2', value: 'val2' },
              { name: 'name3', value: 'val3' },
              { name: 'name4', value: 'val4' },
              { name: 'name5', value: 'val5' },
              { name: 'name6', value: 'val6' }
            ]
          );
        },
        500);
    });

  }
}

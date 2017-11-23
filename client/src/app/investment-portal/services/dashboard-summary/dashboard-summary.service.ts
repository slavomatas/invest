import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { IDashboardSummaryService } from './idashboard-summary-service';
import { Portfolio, CumulativeMeasurement } from '../../types/types';
import { InvestmentActions } from '../../investment-actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/toPromise';

const GET_PORTFOLIOS_URL = 'https://www.invest.strazprirody.org/api/getPortfolios';
const GET_PORTFOLIO_CUMULATIVE_MEASURE_URL = 'https://www.invest.strazprirody.org/api/getPortfolioMeasure';

@Injectable()
export class DashboardSummaryService implements IDashboardSummaryService {
  constructor(private http: HttpClient) { }

  getPortfoliosEpic = (action$: ActionsObservable<any>) => {
    return action$.ofType(InvestmentActions.REQUEST_PORTFOLIOS)
      .mergeMap(({ }) => {
        return this.getPortfolios()
          .map(result => ({
            type: InvestmentActions.PORTFOLIOS_FETCH_SUCCESS,
            payload: result
          }));
      }).catch(error => Observable.of({
        type: InvestmentActions.PORTFOLIOS_FETCH_FAILURE
      }));
  }

  /**
   * @description Gets portfolios for user.
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

export class MockDashboardSummaryService implements IDashboardSummaryService {

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

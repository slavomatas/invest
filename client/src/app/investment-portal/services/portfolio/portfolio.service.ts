import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  Portfolio, PortfolioDetails, CumulativeMeasurement,
  TypeOfReturns, TypeOfPortfolioReturn
} from '../../types/types';
import { PortfolioReturn, ChartModelPortfolio } from '../../types/dashboard-types';
import { IPortfolioService } from './i-portfolio.service';
import { NgRedux, select } from '@angular-redux/store';
import { cloneDeep } from 'lodash';
import { AppState } from '../../store/store';
import { LoggingService } from '../logging/logging.service';
import { RequestOptions } from '@angular/http';
import { RequestStatus } from '../../types/authentication-types';

 const GET_PORTFOLIO_RETURN_VALUE_URL = 'api/v1/measurements/portfolios';
 const PORTFOLIOS_URL = 'api/v1/user/portfolios';

@Injectable()
export class PortfolioService implements IPortfolioService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<AppState>,
    private loggingService: LoggingService
  ) {

  }

  /**
   * Fetches cumulative data for all portfolios
   */
  public async getPortfoliosCumulativeData(dateFrom?: Date, dateTo?: Date): Promise<ChartModelPortfolio[]> {

    let promises: Promise<ChartModelPortfolio>[];

    if (dateTo == null) {
      dateTo = new Date();
    }

    await this.getPortfolios().then(async (portfolios: Portfolio[]) => {
      promises = portfolios.map(async (portfolio: Portfolio) => {
        return await this.getCumulativeDataForPortfolio(portfolio, dateFrom, dateTo);
      });
    });

    let res;
    await Promise.all(promises).then((cumulativeData: ChartModelPortfolio[]) => {
      res = cumulativeData;
    });

    return res;
  }

  /**
   * Closes portfolio and should get the same response
   */
  public async closePortfolio(portfolio: PortfolioDetails): Promise<PortfolioDetails> {

    let promise: Promise<PortfolioDetails>;

    promise = this
      .http.put<PortfolioDetails>(PORTFOLIOS_URL, portfolio).toPromise();

    return promise;
  }

  /**
   * Fetches cumulative data for given portfolio
   * @param portfolio portfolio to get cumulative data for
   */
  public async getCumulativeDataForPortfolio(portfolio: Portfolio, dateFrom: Date, dateTo: Date): Promise<ChartModelPortfolio> {

    // check wether I don't have data already, to let selected one selected
    const portfoliosChart: ChartModelPortfolio[] = this.ngRedux.getState().chartPortfolios;

    let selectedState: ChartModelPortfolio[];
    if (portfoliosChart !== undefined) {
      selectedState = portfoliosChart.filter(x => x.id === portfolio.id); // check wether was the portfolio selected or not.
    }

    // map the portfolio name, id, selected
    const portfolioChart: ChartModelPortfolio = {
      name: portfolio.name,
      id: portfolio.id,
      marketValue: null,
      oldMarketValue: null,
      selected: selectedState.length > 0 ? selectedState[0].selected : true,
      series: []
    };

    // get portfolio measurements and push them into series
    await this.getCumulativeMeasurements(portfolio.id, dateFrom, dateTo).toPromise().then((measurements: CumulativeMeasurement[]) => {

      measurements.map((measurement: CumulativeMeasurement) => {
        portfolioChart.series.push({
          name: new Date(measurement.name).toDateString(),
          value: Number.parseFloat(measurement.value)
        });
      });
    });

    // get market value of a portfolio and update it
    await this.getPortfolioMarketValues(portfolio.id, dateFrom, dateTo).toPromise().then((measurements: PortfolioReturn[]) => {

      const length = measurements.length;

      if (length > 0) {
        portfolioChart.marketValue = Number.parseFloat(measurements[length - 1].value);
        portfolioChart.oldMarketValue = Number.parseFloat(measurements[0].value);
      } else {
        portfolioChart.marketValue = 0;
        portfolioChart.oldMarketValue = 0;
      }

    });

    return portfolioChart;
  }

  /**
   * @description Creates new portfolio
   *
   * @param {Portfolio} [portfolio] Portfolio to be saved
   * @returns {Promise<Portfolio>}
   */
  public createPortfolio(portfolio: Portfolio): Promise<Portfolio> {
    return this.http
      .post<Portfolio>(PORTFOLIOS_URL, portfolio).toPromise();
  }

  /**
   * @description Gets all portfolios for user.
   * @returns {Promise<Portfolio[]>}
   */
  public getPortfolios(): Promise<PortfolioDetails[]> {
    return this.http
      .get<PortfolioDetails[]>(PORTFOLIOS_URL).toPromise();
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
  public getCumulativeMeasurements(portfolioId: number, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]> {
    let params: HttpParams = new HttpParams();

    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toISOString());
    }

    const requestUrl = GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/' + TypeOfPortfolioReturn['cumulative'];
    this.loggingService.captureRequestWithParams(requestUrl, JSON.stringify(params));
    return this.http
      .get<CumulativeMeasurement[]>(requestUrl,
        {
          params: params
        });
  }

  /**
   * @description Fetches Market value for given portfolio id on specific day
   *
   * @param {string} portfolioId Id of portfolio to fetch Cumulative Measurements for
   * @param {Date} [dateFrom] Date from which measurements should be returned
   * @param {Date} [dateTo] Date to which measurements should be returned
   * @returns {Observable<CumulativeMeasurement[]>}
   * @memberof IDashboardSummaryService
   */
  public getPortfolioMarketValues(portfolioId: number, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]> {
    let params: HttpParams = new HttpParams();

    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toISOString());
    }

    const requestUrl = GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/PORTFOLIO_MARKET_VALUE';
    this.loggingService.captureRequestWithParams(requestUrl, JSON.stringify(params));
    return this.http
      .get<PortfolioReturn[]>(requestUrl, {
        params: params
      });
  }

  public getPortfolioReturn(portfolioId: number, portfolioReturnType: TypeOfPortfolioReturn, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]> {
    let params: HttpParams = new HttpParams();

    if (dateFrom != null) {
      dateFrom = new Date();
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      dateTo = new Date();
      params = params.set('dateTo', dateTo.toISOString());
    }

    const requestUrl = GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/' + portfolioReturnType;
    this.loggingService.captureRequestWithParams(requestUrl, JSON.stringify(params));
    return this.http
      .get<CumulativeMeasurement[]>(requestUrl, {
        params: params
      });
  }

  getPortfolioMarketValue(portfolioId: number, date?: Date): Observable<number> {
    let params: HttpParams = new HttpParams();

    if (date != null) {
      date = new Date();
      params = params.set('date', date.toISOString());
    }

    const requestUrl = GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/PORTFOLIO_MARKET_VALUE';
    this.loggingService.captureRequestWithParams(requestUrl, JSON.stringify(params));
    return this.http
      .get<number>(requestUrl, {
        params: params
      });
  }

  getPortfolioPositions(portfolioId: number): Promise<{name: string; value: number; }[]> {
    const requestUrl = PORTFOLIOS_URL + '/' + portfolioId + '/positions';
    return this.http
      .get<{ name: string; value: number; }[]>(requestUrl).toPromise();
  }


  private getFirstDateOfPeriod(portfolioReturnType: TypeOfPortfolioReturn): Date {
    const today = new Date();

    switch (portfolioReturnType) {
      case TypeOfPortfolioReturn.weekly:
        today.setDate(today.getDate() - 7);
        return today;

      case TypeOfPortfolioReturn.daily:
        today.setDate(today.getDate() - 1);
        return today;

      case TypeOfPortfolioReturn.monthly:
        today.setMonth(today.getMonth() - 1);
        return today;

      case TypeOfPortfolioReturn.quaterly:
        today.setMonth(today.getMonth() - 3);
        return today;

      case TypeOfPortfolioReturn.yearly:
        today.setMonth(today.getMonth() - 12);
        return today;

      default:
        return today;
    }
  }
}


export class MockPortfolioService {

  getPortfoliosListDetails(portfolioReturnType: TypeOfPortfolioReturn): Promise<PortfolioDetails[]> {

    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(
            [
              {
                'id': 5,
                'name': 'Portfolio5',
                'description': null,
                'marketValue': 8565.300000000001,
                'lastChangeAbs': -8.55999999999949,
                'lastChangePct': -0.0012309072764449258,
                'returns': {
                  'daily': 0.0,
                  'weekly': -0.013691531747311081,
                  'monthly': 0.04483802223298383,
                  'quarterly': 0.0,
                  'yearly': 0.04483802223298383,
                  'cumulative': 0.0,
                  'all': 0.23166940361392152
                },
                'cash': 4.547473508864641E-13,
                'positions': [
                  {
                    'symbol': 'RFG',
                    'value': 30.98258484816644
                  },
                  {
                    'symbol': 'RPG',
                    'value': 30.284193198136666
                  },
                  {
                    'symbol': 'RZG',
                    'value': 16.58022439377488
                  },
                  {
                    'symbol': 'DNL',
                    'value': 8.989865293684984
                  },
                  {
                    'symbol': 'ELD',
                    'value': 3.701523589366397
                  },
                  {
                    'symbol': 'EMCB',
                    'value': 12.51317219478594
                  },
                  {
                    'symbol': 'cash',
                    'value': 4.547473508864641E-13
                  }
                ]
              },
              {
                'id': 6,
                'name': 'Portfolio6',
                'description': null,
                'marketValue': 6831.6,
                'lastChangeAbs': 13.960000000000036,
                'lastChangePct': 0.0021377664934199014,
                'returns': {
                  'daily': 0.0,
                  'weekly': -0.0074878616445401835,
                  'monthly': 0.003967904064897665,
                  'quarterly': 0.0,
                  'yearly': 0.003967904064897665,
                  'cumulative': 0.0,
                  'all': 0.0461579925821336
                },
                'cash': 0.0,
                'positions': [
                  {
                    'symbol': 'IDV',
                    'value': 3.661419286843492
                  },
                  {
                    'symbol': 'KXI',
                    'value': 34.064682943966275
                  },
                  {
                    'symbol': 'AGG',
                    'value': 34.245274898998765
                  },
                  {
                    'symbol': 'XLU',
                    'value': 7.634034779553837
                  },
                  {
                    'symbol': 'DBP',
                    'value': 4.609468938462439
                  },
                  {
                    'symbol': 'cash',
                    'value': 0.0
                  }
                ]
              },
              {
                'id': 2,
                'name': 'Portfolio2',
                'description': null,
                'marketValue': 9498.18,
                'lastChangeAbs': -2.6200000000008004,
                'lastChangePct': -2.8607304689631796E-4,
                'returns': {
                  'daily': 0.0,
                  'weekly': -0.014425351761922722,
                  'monthly': 0.0629950869025111,
                  'quarterly': 0.0,
                  'yearly': 0.0629950869025111,
                  'cumulative': 0.0,
                  'all': 0.03708904296555127
                },
                'cash': 0.0,
                'positions': [
                  {
                    'symbol': 'PSCT',
                    'value': 12.981194923659059
                  },
                  {
                    'symbol': 'SKYY',
                    'value': 2.5478990922471465
                  },
                  {
                    'symbol': 'SSG',
                    'value': 0.1692858884544197
                  },
                  {
                    'symbol': 'VGT',
                    'value': 66.2145870050894
                  },
                  {
                    'symbol': 'XLK',
                    'value': 9.881029312984172
                  },
                  {
                    'symbol': 'FDN',
                    'value': 15.717820256091166
                  },
                  {
                    'symbol': 'IBB',
                    'value': 14.070560886401394
                  },
                  {
                    'symbol': 'cash',
                    'value': 0.0
                  }
                ]
              }

            ]
          );
        },
        500);
    });
  }

  public getPortfolios(): Promise<Portfolio[]> {

    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(
            [
              { name: 'Mock portfolio 1', id: 1, description: 'Mock portfolio 1 Description' },
              { name: 'Mock portfolio 2', id: 2, description: 'Mock portfolio 2 Description' },
              { name: 'Mock portfolio 3', id: 3, description: 'Mock portfolio 3 Description' }
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


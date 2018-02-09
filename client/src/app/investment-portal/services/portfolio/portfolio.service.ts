import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {
  Portfolio, PortfolioDetails, CumulativeMeasurement,
  TypeOfReturns, TypeOfPortfolioReturn, PortfolioPosition
} from '../../types/types';
import { PortfolioReturn } from '../../types/dashboard-types';
import { IPortfolioService } from './i-portfolio.service';
import { NgRedux, select } from '@angular-redux/store';
import { cloneDeep } from 'lodash';
import { AppState } from '../../store/store';
import { LoggingService } from '../logging/logging.service';
import { setOldMarketValue, getDateFrom } from '../../utils/portfolio-utils';

 const GET_PORTFOLIO_RETURN_VALUE_URL = 'api/v1/measurements/portfolios';
 const PORTFOLIOS_URL = 'api/v1/user/portfolios';


 interface PortfolioPositionsResponse {
    positionId: number;
    security: {
      symbol: string;
      name: string;
      currency: string
      active: true;
    };
    trades: {
      tradeId: number;
      price: number;
      amount: number;
      dateTime: string;
    }[];
    priceLast20Days: {
      name: string;
      value: number;
    }[];
    lastChange: number;
  }

@Injectable()
export class PortfolioService implements IPortfolioService {

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<AppState>,
    private loggingService: LoggingService
  ) {

  }

  /**
   * Loads Positions for given portfolio
   * @param portfolio Portfolio to get positions for
   * @returns array of Porfolio Position that have new data from REST. Value is taken from @param portfolio
   */
  public getPortfolioPositions(portfolio: PortfolioDetails): Promise<PortfolioPosition[]> {
    const requestUrl = PORTFOLIOS_URL + '/' + portfolio.id + '/positions';

    return this.http.get<PortfolioPositionsResponse[]>(requestUrl).toPromise()
      .then((responsePositions: PortfolioPositionsResponse[]) => {
        const newPositionsArray: PortfolioPosition[] = [];

        // create new position with market value of given porfolio for each response position
        responsePositions.forEach((responsePosition: PortfolioPositionsResponse) => {

          // filter position of given portfolio based on its symbol
          const actPosition = portfolio.positions.filter(position => position.symbol === responsePosition.security.symbol)[0];

          // compute quantity as sum of amount of all trades
          let quantity = 0;
          responsePosition.trades.forEach((trade) => {
            quantity += trade.amount;
          });

          // price is the last value of last 20 days
          const price = responsePosition.priceLast20Days[responsePosition.priceLast20Days.length - 1].value;

          // update position of given portfolio with data from REST
          actPosition.symbol = responsePosition.security.symbol;
          actPosition.name = responsePosition.security.name;
          actPosition.quantity = quantity;
          actPosition.price = price;
          actPosition.currency = responsePosition.security.currency;
          actPosition.priceLast20Days = responsePosition.priceLast20Days;
          actPosition.lastChange = responsePosition.lastChange;
          actPosition.trades = responsePosition.trades;

          // add updated position into result array
          newPositionsArray.push(actPosition);
        });

        return newPositionsArray;
      });
  }


  /**
   * Fetches cumulative data for all portfolios
   */
  public async getPortfoliosCumulativeData(period: string): Promise<PortfolioDetails[]> {

    let promises: Promise<PortfolioDetails>[] = [];

    await this.getPortfolios().then(async (portfolios: PortfolioDetails[]) => {
      promises = portfolios.map(async (portfolio: PortfolioDetails) => {
        portfolio.oldMarketValues = {};
        return await this.getCumulativeDataForPortfolio(portfolio, period);
      });
    });

    return await Promise.all(promises).then((cumulativeData: PortfolioDetails[]) => {
      return cumulativeData;
    });

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
  public async getCumulativeDataForPortfolio(portfolio: PortfolioDetails, period: string): Promise<PortfolioDetails> {

    portfolio.series = [];
    const dateTo = new Date();
    const dateFrom = getDateFrom(dateTo, period);


    // get portfolio measurements (time series) and push them into portfolioChart.series
    await this.getCumulativeMeasurements(portfolio.id, dateFrom, dateTo).toPromise().then((measurements: CumulativeMeasurement[]) => {
       measurements.map((measurement: CumulativeMeasurement) => {
        portfolio.series.push({
          name: new Date(measurement.name).toDateString(),
          value: Number.parseFloat(measurement.value)
        });
      });
    });

    // get market value of a portfolio and update it
    await this.getPortfolioMarketValues(portfolio.id, dateFrom, dateTo).toPromise().then((measurements: PortfolioReturn[]) => {
      const length = measurements.length;

      if (length > 0){
        portfolio.marketValue = Number.parseFloat(measurements[length - 1].value);
        setOldMarketValue(period, portfolio.oldMarketValues, Number.parseFloat(measurements[0].value));
        // portfolio.oldMarketValues = Number.parseFloat(measurements[0].value);
      } else {
        portfolio.marketValue = 0;
        setOldMarketValue(period, portfolio.oldMarketValues, 0);
        // portfolio.oldMarketValues = 0;
      }
    });

    return portfolio;
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


// export class MockPortfolioService {

//   getPortfoliosListDetails(portfolioReturnType: TypeOfPortfolioReturn): Promise<PortfolioDetails[]> {

//     return new Promise((resolve) =>  {
//       setTimeout(
//         () => {
//           resolve(
//             [
//               {
//                 'id': 5,
//                 'name': 'Portfolio5',
//                 'description': null,
//                 'marketValue': 8565.300000000001,
//                 'lastChangeAbs': -8.55999999999949,
//                 'lastChangePct': -0.0012309072764449258,
//                 'oldMarketValue': 8250.454,
//                 'returns': {
//                   'daily': 0.0,
//                   'weekly': -0.013691531747311081,
//                   'monthly': 0.04483802223298383,
//                   'quarterly': 0.0,
//                   'yearly': 0.04483802223298383,
//                   'cumulative': 0.0,
//                   'all': 0.23166940361392152
//                 },
//                 'cash': 4.547473508864641E-13,
//                 'positions': [
//                   {
//                     'symbol': 'RFG',
//                     'value': 30.98258484816644
//                   },
//                   {
//                     'symbol': 'RPG',
//                     'value': 30.284193198136666
//                   },
//                   {
//                     'symbol': 'RZG',
//                     'value': 16.58022439377488
//                   },
//                   {
//                     'symbol': 'DNL',
//                     'value': 8.989865293684984
//                   },
//                   {
//                     'symbol': 'ELD',
//                     'value': 3.701523589366397
//                   },
//                   {
//                     'symbol': 'EMCB',
//                     'value': 12.51317219478594
//                   },
//                   {
//                     'symbol': 'cash',
//                     'value': 4.547473508864641E-13
//                   }
//                 ],
//                 series: [
//                   {
//                     'name': 'string',
//                     'value': 1200.04
//                   }
//                 ]
//               },
//             //   {
//             //     'id': 6,
//             //     'name': 'Portfolio6',
//             //     'description': null,
//             //     'marketValue': 6831.6,
//             //     'lastChangeAbs': 13.960000000000036,
//             //     'lastChangePct': 0.0021377664934199014,
//             //     'returns': {
//             //       'daily': 0.0,
//             //       'weekly': -0.0074878616445401835,
//             //       'monthly': 0.003967904064897665,
//             //       'quarterly': 0.0,
//             //       'yearly': 0.003967904064897665,
//             //       'cumulative': 0.0,
//             //       'all': 0.0461579925821336
//             //     },
//             //     'cash': 0.0,
//             //     'positions': [
//             //       {
//             //         'symbol': 'IDV',
//             //         'value': 3.661419286843492
//             //       },
//             //       {
//             //         'symbol': 'KXI',
//             //         'value': 34.064682943966275
//             //       },
//             //       {
//             //         'symbol': 'AGG',
//             //         'value': 34.245274898998765
//             //       },
//             //       {
//             //         'symbol': 'XLU',
//             //         'value': 7.634034779553837
//             //       },
//             //       {
//             //         'symbol': 'DBP',
//             //         'value': 4.609468938462439
//             //       },
//             //       {
//             //         'symbol': 'cash',
//             //         'value': 0.0
//             //       }
//             //     ]
//             //   },
//             //   {
//             //     'id': 2,
//             //     'name': 'Portfolio2',
//             //     'description': null,
//             //     'marketValue': 9498.18,
//             //     'lastChangeAbs': -2.6200000000008004,
//             //     'lastChangePct': -2.8607304689631796E-4,
//             //     'returns': {
//             //       'daily': 0.0,
//             //       'weekly': -0.014425351761922722,
//             //       'monthly': 0.0629950869025111,
//             //       'quarterly': 0.0,
//             //       'yearly': 0.0629950869025111,
//             //       'cumulative': 0.0,
//             //       'all': 0.03708904296555127
//             //     },
//             //     'cash': 0.0,
//             //     'positions': [
//             //       {
//             //         'symbol': 'PSCT',
//             //         'value': 12.981194923659059
//             //       },
//             //       {
//             //         'symbol': 'SKYY',
//             //         'value': 2.5478990922471465
//             //       },
//             //       {
//             //         'symbol': 'SSG',
//             //         'value': 0.1692858884544197
//             //       },
//             //       {
//             //         'symbol': 'VGT',
//             //         'value': 66.2145870050894
//             //       },
//             //       {
//             //         'symbol': 'XLK',
//             //         'value': 9.881029312984172
//             //       },
//             //       {
//             //         'symbol': 'FDN',
//             //         'value': 15.717820256091166
//             //       },
//             //       {
//             //         'symbol': 'IBB',
//             //         'value': 14.070560886401394
//             //       },
//             //       {
//             //         'symbol': 'cash',
//             //         'value': 0.0
//             //       }
//             //     ]
//             //   }

//             ]
//           );
//         },
//         500);
//     });
//   }

//   public getPortfolios(): Promise<Portfolio[]> {

//     return new Promise((resolve) =>  {
//       setTimeout(
//         () => {
//           resolve(
//             [
//               { name: 'Mock portfolio 1', id: 1 },
//               { name: 'Mock portfolio 2', id: 2 },
//               { name: 'Mock portfolio 3', id: 3 }
//             ]
//           );
//         },
//         500);
//     });
//   }

//   public getCumulativeMeasurements(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<CumulativeMeasurement[]> {

//     return new Observable<CumulativeMeasurement[]>(observer => {
//       setTimeout(
//         () => {
//           observer.next(
//             [
//               { name: 'name1', value: 'val1' },
//               { name: 'name2', value: 'val2' },
//               { name: 'name3', value: 'val3' },
//               { name: 'name4', value: 'val4' },
//               { name: 'name5', value: 'val5' },
//               { name: 'name6', value: 'val6' }
//             ]
//           );
//         },
//         500);
//     });

//   }

// }


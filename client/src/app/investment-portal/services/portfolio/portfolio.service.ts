import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Portfolio, PortfolioDetails, CumulativeMeasurement,
  TypeOfReturns, TypeOfPortfolioReturn
} from '../../types/types';
import { PortfolioReturn, ChartModelPortfolio } from '../../types/dashboard-types';
import { IPortfolioService } from './i-portfolio.service';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../../store';
import { cloneDeep } from 'lodash';

 const GET_PORTFOLIO_RETURN_VALUE_URL = 'api/v1/measurements/portfolios';
 const GET_PORTFOLIOS_URL = 'api/v1/user/portfolios';

@Injectable()
export class PortfolioService implements IPortfolioService {

  private mockPortfolioService: MockPortfolioService = new MockPortfolioService();

  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<AppState>)
  {

  }


  /**
   * Fetches cumulative data for all portfolios
   */
  public async getPortfoliosCumulativeData(dateFrom?: Date, dateTo?: Date): Promise<ChartModelPortfolio[]> {

    let promises: Promise<ChartModelPortfolio>[];

    if(dateTo == null){
      dateTo = new Date();
    }

/*    await this.getPortfolios().then(async (portfolios: Portfolio[]) => {
      promises = portfolios.map(async (portfolio: Portfolio) => {
        return await this.getPortfolioDetailsData(portfolio, TypeOfPortfolioReturn["cumulative"]);
      });
    });*/

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
          name: measurement.name,
          value: Number.parseFloat(measurement.value)
        });
      });
    });

    // get market value of a portfolio and update it
    await this.getPortfolioMarketValues(portfolio.id, dateFrom, dateTo).toPromise().then((measurements: PortfolioReturn[]) => {

      let length = measurements.length;

      if(length > 0){
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
   * @description Gets all portfolios for user.
   * @returns {Promise<Portfolio[]>}
   */
  public getPortfolios(): Promise<Portfolio[]> {
    return this.http
      .get<Portfolio[]>(GET_PORTFOLIOS_URL).toPromise();
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

    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toISOString());
    }

    return this.http
      .get<CumulativeMeasurement[]>(GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/' + TypeOfPortfolioReturn["cumulative"],
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
  public getPortfolioMarketValues(portfolioId: string, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]> {
    let params: HttpParams = new HttpParams();

    if (dateFrom != null) {
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      params = params.set('dateTo', dateTo.toISOString());
    }

    return this.http
      .get<PortfolioReturn[]>(GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/PORTFOLIO_MARKET_VALUE', {
        params: params
      });
  }

  /**
   * Fetches cumulative data for all portfolios
   */
  public async getPortfoliosListDetails(portfolioReturnType: TypeOfPortfolioReturn): Promise<PortfolioDetails[]> {

    let promises: Promise<PortfolioDetails>[];

    await this.getPortfolios().then(async (portfolios: Portfolio[]) => {
      promises = portfolios.map(async (portfolio: Portfolio) => {
        return await this.getPortfolioDetailsData(portfolio, portfolioReturnType);
      });
    });

    let res;
    await Promise.all(promises).then((portfolioListData: PortfolioDetails[]) => {
      res = portfolioListData;
    });

    return res;
  }

  /**
   * Fetches cumulative data for given portfolio
   * @param portfolio portfolio to get cumulative data for
   */
  public async getPortfolioDetailsData(portfolio: Portfolio, portfolioReturnType: TypeOfPortfolioReturn): Promise<PortfolioDetails> {

    const portfolioDetails: PortfolioDetails = {
      name: portfolio.name,
      id: portfolio.id,
      marketValue: null,
      oldMarketValue: null,
      returns: null,
      positions: []
    };

    // what shall I do here???? next steps: create another method so
    // one will return returns and other one positions.
    // call them for portfolio and put it all together to one object here.
    await this.getPortfolioReturn(portfolio.id, portfolioReturnType).toPromise().then((returns: PortfolioReturn[]) => {
      returns.map((returnValue: PortfolioReturn) => {
        portfolioDetails.returns.daily = Number.parseFloat(returnValue.value);
      });
    });

    // await this.getPortfolioMarketValue(portfolio.id).toPromise().then((value: number) => {
    //
    //     portfolioDetails.marketValue = value;
    // });

      await this.getPortfolioMarketValue(portfolio.id).toPromise().then((value: number) => {
          portfolioDetails.oldMarketValue = value;
      });

    return null;
  }



  public getPortfolioReturn(portfolioId: string, portfolioReturnType: TypeOfPortfolioReturn, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]> {
    let params: HttpParams = new HttpParams();

    if (dateFrom != null) {
      dateFrom = new Date();
      params = params.set('dateFrom', dateFrom.toISOString());
    }

    if (dateTo != null) {
      dateTo = new Date();
      params = params.set('dateTo', dateTo.toISOString());
    }

    return this.http
      .get<CumulativeMeasurement[]>(GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId + '/' + portfolioReturnType , {
        params: params
      });
  }

  getPortfolioMarketValue(portfolioId: string, date?: Date): Observable<number> {
    let params: HttpParams = new HttpParams();

    if (date != null) {
      date = new Date();
      params = params.set('date', date.toISOString());
    }

    return this.http
      .get<number>(GET_PORTFOLIO_RETURN_VALUE_URL + '/' + portfolioId , {
        params: params
      });
  }
  getPortfolioPositions(portfolioId: string): Observable<number> {
    throw new Error('Method not implemented.');
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

export class MockPortfolioService implements IPortfolioService {

  getPortfoliosListDetails(portfolioReturnType: TypeOfPortfolioReturn): Promise<PortfolioDetails[]> {
    return new Promise((resolve) =>  {
      setTimeout(
        () => {
          resolve(
            [
              { name: 'Mock portfolio 1',
                id: 'PID5a03486d2298316ac85459bf',
                marketValue: 107,
                oldMarketValue: 115,
                returns: {
                  daily: 0.00159238920396665,
                  weekly: 0.0146940506004236,
                  monthly: 0.00733306344259854,
                },
                positions:
                  [
                    {name: 'BIL', value: 40.632},
                    {name: 'CEV', value: 49.737},
                    {name: 'NFO', value: 36.745},
                    {name: 'PSR', value: 40.632},
                    {name: 'AGG', value: 36.240},
                  ]
              },
              { name: 'Mock portfolio 2',
                id: 'PID5a03486e2298316ac85459c0',
                marketValue: 200,
                oldMarketValue: 150,
                returns: {
                  daily: -0.00301981425613618,
                  weekly: 0.0099937424031975,
                  monthly: 0.0099937424031975,
                },
                positions:
                  [
                    {name: 'B&T', value: 103.7},
                    {name: 'JOE', value: 29.356},
                    {name: 'DOE', value: 30.126},
                    {name: 'P2P', value: 47},
                    {name: 'AGG', value: 73},
                  ]
              },
              { name: 'Mock portfolio 3',
                id: 'PID5a03486f2298316ac85459c1',
                marketValue: 90,
                oldMarketValue: 65,
                returns: {
                  daily: 0.0015923892039666,
                  weekly: 0.0146940506004236,
                  monthly: 0.00733306344259854,
                },
                positions:
                  [
                    {name: 'BIL', value: 17},
                    {name: 'CEV', value: 13.4},
                    {name: 'NFO', value: 22.65},
                    {name: 'PSR', value: 19.735},
                  ]
              },

            ]
          );
        },
        500);
    });
  }

  public getPortfolios(): Promise<Portfolio[]> {

    return new Promise((resolve) =>  {
      setTimeout(
        () => {
          resolve(
            [
              { name: 'Mock portfolio 1', id: 'PID5a03486d2298316ac85459bf' },
              { name: 'Mock portfolio 2', id: 'PID5a03486e2298316ac85459c0' },
              { name: 'Mock portfolio 3', id: 'PID5a03486f2298316ac85459c1' }
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

  public getPortfolioReturn(portfolioId: string, portfolioReturnType: TypeOfPortfolioReturn, dateFrom?: Date, dateTo?: Date): Observable<PortfolioReturn[]> {
      return new Observable<PortfolioReturn[]>(observer => {

      });
    // return new Observable<PortfolioDetails[]>(observer => {
    //   setTimeout(
    //     () => {
    //       observer.next(
    //         [
    //           { name: 'Mock portfolio 1',
    //             id: 'id1',
    //             marketValue: 525464,
    //             oldMarketValue: 525400,
    //             returns: {
    //               daily: 0.00159238920396665,
    //               weekly: 0.0146940506004236,
    //               monthly: 0.00733306344259854,
    //             },
    //             positions:
    //               [
    //                 {name: 'BIL', value: 20},
    //                 {name: 'CEV', value: 20},
    //                 {name: 'NFO', value: 20},
    //                 {name: 'PSR', value: 20},
    //                 {name: 'AGG', value: 20},
    //               ]
    //           },
    //           { name: 'Mock portfolio 2',
    //             id: 'id2',
    //             marketValue: 675464,
    //             oldMarketValue: 525401,
    //             returns: {
    //               daily: -0.00301981425613618,
    //               weekly: -0.00163140823711172,
    //               monthly: 0.0099937424031975,
    //             },
    //             positions:
    //               [
    //                 {name: 'BIL', value: 20},
    //                 {name: 'JOE', value: 20},
    //                 {name: 'DOE', value: 20},
    //                 {name: 'P2P', value: 20},
    //                 {name: 'AGG', value: 20},
    //               ]
    //           },
    //         ]
    //       );
    //     },
    //     500);
    // });
  }

  getPortfolioMarketValue(portfolioId: string): Observable<number> {
    throw new Error('Method not implemented.');
  }
  getPortfolioPositions(portfolioId: string): Observable<number> {
    throw new Error('Method not implemented.');
  }
}

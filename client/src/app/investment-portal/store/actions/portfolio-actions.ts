import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { PortfolioDetails, PortfolioTimeSeries, Portfolio } from '../../types/types';
import { AppState } from '../store';
import { getNewPortfolioColor } from '../../utils/portfolio-utils';

@Injectable()
export class PortfolioActions {

    static GET_CUMULATIVE_FULFILLED_SUCCESS = 'GET_CUMULATIVE_FULFILLED_SUCCESS';
    static FGET_CUMULATIVE_FULFILLED_FAILURE = 'FGET_CUMULATIVE_FULFILLED_FAILURE';
    static GET_PORTFOLIOS_CUMULATIVE_DATA = 'GET_PORTFOLIOS_CUMULATIVE_DATA';
    static GET_PORTFOLIOS = 'GET_PORTFOLIOS';
    static FGET_PORTFOLIOS = 'FGET_PORTFOLIOS';
    static GET_MODEL_PORTFOLIOS = 'GET_MODEL_PORTFOLIOS';
    static FGET_MODEL_PORTFOLIOS = 'FGET_MODEL_PORTFOLIOS';
    static SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED = 'SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED';
    static SET_CUMULATIVE_CHART_PERIOD = 'SET_CUMULATIVE_CHART_PERIOD';
    static SET_PORTFOLIO_SUMMARY = 'SET_PORTFOLIO_SUMMARY';
    static UPDATE_FIRST_LOGIN_FLAG = 'UPDATE_FIRST_LOGIN_FLAG';

    constructor(private ngRedux: NgRedux<AppState>) { }

    public getPortfoliosCumulativeData() {
        this.ngRedux.dispatch({ type: PortfolioActions.GET_PORTFOLIOS_CUMULATIVE_DATA });
    }

    public addPortfolio(portfolio: Portfolio) {
      const newPortfolioList = this.ngRedux.getState().portfolioList;
      const newPortfolioColor = getNewPortfolioColor(newPortfolioList.length);
      newPortfolioList.push({
        id: portfolio.id,
        name: portfolio.name,
        description: portfolio.description,
        marketValue: 0,
        oldMarketValues: {
          oneM: 0,
          threeM: 0,
          sixM: 0,
          nineM: 0,
          twelveM: 0,
          all: 0
        },
        lastChangeAbs: 0,
        lastChangePct: 0,
        returns: {},
        cash: 0,
        closed: false,
        isDisplayed: true,
        positions: [],
        series: [],
        model: false,
        color: newPortfolioColor
      });
      this.ngRedux.dispatch({ type: PortfolioActions.GET_PORTFOLIOS, payload: newPortfolioList});
    }

    public getPortfoliosComulativeDataFullfiled(success: boolean, data?: PortfolioTimeSeries[]) {
        this.ngRedux.dispatch({
            type: success ? PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS : PortfolioActions.FGET_CUMULATIVE_FULFILLED_FAILURE,
            payload: data != null ? data : undefined
        });
    }

    public getPortfolios(success: boolean, data?: PortfolioDetails[]) {
      this.ngRedux.dispatch({
        type: success ? PortfolioActions.GET_PORTFOLIOS : PortfolioActions.FGET_PORTFOLIOS,
        payload: data != null ? data : undefined
      });
    }

  public getModelPortfolios(success: boolean, data?: PortfolioDetails[]) {
    this.ngRedux.dispatch({
      type: success ? PortfolioActions.GET_MODEL_PORTFOLIOS : PortfolioActions.FGET_MODEL_PORTFOLIOS,
      payload: data != null ? data : undefined
    });
  }


    public setCumulativeChartPeriod(period: string){
      this.ngRedux.dispatch({
        type: PortfolioActions.SET_CUMULATIVE_CHART_PERIOD,
        payload: period
      });
    }

    public setPortfolioCumulativeChartSelected(data: PortfolioDetails[]){
      this.ngRedux.dispatch({
        type: PortfolioActions.SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED,
        payload: data
      });
    }

    public updatePortfolio(data: PortfolioDetails){

      const portfolioList: PortfolioDetails[] = this.ngRedux.getState().portfolioList;
      const newPortfolioList: PortfolioDetails[] = [];

      portfolioList.forEach((portfolio) => {
        if (data.id === portfolio.id){
          newPortfolioList.push(data);
        } else {
          newPortfolioList.push(portfolio);
        }
      });

      this.ngRedux.dispatch({
        type: PortfolioActions.GET_PORTFOLIOS,
        payload: newPortfolioList
      });
    }

    public updateUserFirstLoginFlag(newValue: boolean) {
      this.ngRedux.dispatch({
        type: PortfolioActions.UPDATE_FIRST_LOGIN_FLAG,
        payload: newValue
      });
    }
  public updateModelPortfolio(data: PortfolioDetails){

    const portfolioList: PortfolioDetails[] = this.ngRedux.getState().modelPortfolioList;
    const newPortfolioList: PortfolioDetails[] = [];

    portfolioList.forEach((portfolio) => {
      if (data.id === portfolio.id){
        newPortfolioList.push(data);
      } else {
        newPortfolioList.push(portfolio);
      }
    });

    this.ngRedux.dispatch({
      type: PortfolioActions.GET_MODEL_PORTFOLIOS,
      payload: newPortfolioList
    });
  }

}

import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store';
import { ChartModelPortfolio } from '../../types/types';

@Injectable()
export class PortfolioActions {

    static GET_CUMULATIVE_FULFILLED_SUCCESS = 'GET_CUMULATIVE_FULFILLED_SUCCESS';
    static FGET_CUMULATIVE_FULFILLED_FAILURE = 'FGET_CUMULATIVE_FULFILLED_FAILURE';
    static GET_PORTFOLIOS_CUMULATIVE_DATA = 'GET_PORTFOLIOS_CUMULATIVE_DATA';
    static GET_PORTFOLIOS_SUMMARY_DATA = 'GET_PORTFOLIOS_SUMMARY_DATA';
    static SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED = 'SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED';


    constructor(private ngRedux: NgRedux<AppState>) { }

    public getPortfoliosCumulativeData() {
        this.ngRedux.dispatch({ type: PortfolioActions.GET_PORTFOLIOS_CUMULATIVE_DATA });
    }

    public getPortfoliosComulativeDataFullfiled(success: boolean, data?: ChartModelPortfolio[]) {
        this.ngRedux.dispatch({
            type: success ? PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS : PortfolioActions.FGET_CUMULATIVE_FULFILLED_FAILURE,
            payload: data != null ? data : undefined
        });
    }

    public getPortfoliosSummaryData(){
      this.ngRedux.dispatch({
        type: PortfolioActions.GET_PORTFOLIOS_SUMMARY_DATA
      });
    }

    public setPortfolioCumulativeChartSelected(data: ChartModelPortfolio[]){
      this.ngRedux.dispatch({
        type: PortfolioActions.SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED,
        payload: data
      });
    }

}

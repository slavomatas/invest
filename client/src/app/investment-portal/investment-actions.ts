import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Portfolio } from './types/types';

@Injectable()
export class InvestmentActions {

    static REQUEST_PORTFOLIOS = 'REQUEST_PORTFOLIOS';
    static PORTFOLIOS_FETCH_SUCCESS = 'PORTFOLIOS_FETCH_SUCCESS';
    static PORTFOLIOS_FETCH_FAILURE = 'PORTFOLIOS_FETCH_FAILURE';

    constructor (
        private ngRedux: NgRedux<AppState>) {}

    requestPortfolios() {
        this.ngRedux.dispatch({ type: InvestmentActions.REQUEST_PORTFOLIOS});
    }

}

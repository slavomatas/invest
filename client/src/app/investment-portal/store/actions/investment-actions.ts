import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store';

@Injectable()
export class InvestmentActions {

    static FETCH_PORTFOLIOS = 'REQUEST_PORTFOLIOS';
    static FETCH_PORTFOLIOS_FULFILLED_SUCCESS = 'PORTFOLIOS_FETCH_SUCCESS';
    static FETCH_PORTFOLIOS_FULFILLED_FAILURE = 'PORTFOLIOS_FETCH_FAILURE';

    constructor (
        private ngRedux: NgRedux<AppState>) {}

    fetchPortfolios() {
        this.ngRedux.dispatch({ type: InvestmentActions.FETCH_PORTFOLIOS});
    }

}

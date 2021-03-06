import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { PortfolioActions } from '../actions/portfolio-actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PortfolioTimeSeries } from '../../types/types';

@Injectable()
export class PortfolioEpics {

    constructor(private portfolioService: PortfolioService, private portfolioActions: PortfolioActions) { }

    public getPortfoliosCumulativeDataEpic = (action$: ActionsObservable<any>) => {

        return action$.ofType(PortfolioActions.GET_PORTFOLIOS_CUMULATIVE_DATA)
            .mergeMap((cData) => {

                return cData.map((portfolios: PortfolioTimeSeries) => ({
                    type: PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS,
                    payload: portfolios
                }));

            }).catch(error => Observable.of({
                type: PortfolioActions.FGET_CUMULATIVE_FULFILLED_FAILURE,
                payload: error
            }));
    }


    // EXAMPLE of how epic middleware can be used:
    // this middleware is executed AFTER PortfolioActions.FETCH_PORTFOLIOS is taken care of
    // by corresponding reducer. Epic middleware then return new action that is dispatched.
    // public fetchPortfoliosEpic = (action$: ActionsObservable<any>) => {
    //     return action$.ofType(PortfolioActions.FETCH_PORTFOLIOS)
    //         .mergeMap((action) => {
    //             return this.portfolioService.getPortfolios()
    //                 .map((portfolios: Portfolio[]) => ({
    //                     type: PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS,
    //                     payload: portfolios
    //                 }));
    //         }).catch(error => Observable.of({
    //             type: PortfolioActions.FGET_CUMULATIVE_FULFILLED_FAILURE
    //         }));
    // }

}

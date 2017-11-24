import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { PortfolioActions } from '../actions/portfolio-actions';
import { Portfolio } from '../../types/types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

@Injectable()
export class PortfolioEpics {

    constructor(private portfolioService: PortfolioService) {}

    public fetchPortfoliosEpic = (action$: ActionsObservable<any>) => {
        return action$.ofType(PortfolioActions.FETCH_PORTFOLIOS)
          .mergeMap((action) => {
            return this.portfolioService.getPortfolios()
              .map((portfolios: Portfolio[]) => ({
                type: PortfolioActions.FETCH_PORTFOLIOS_FULFILLED_SUCCESS,
                payload: portfolios
              }));
          }).catch(error => Observable.of({
            type: PortfolioActions.FETCH_PORTFOLIOS_FULFILLED_FAILURE
          }));
      }

}

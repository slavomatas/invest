import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { InvestmentActions } from '../actions/investment-actions';
import { Portfolio } from '../../types/types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { DashboardSummaryService } from '../../services/dashboard-summary/dashboard-summary.service';

@Injectable()
export class PortfolioEpics {

    constructor(private dashboardSummaryService: DashboardSummaryService) {}

    public fetchPortfoliosEpic = (action$: ActionsObservable<any>) => {
        return action$.ofType(InvestmentActions.FETCH_PORTFOLIOS)
          .mergeMap((action) => {
            return this.dashboardSummaryService.getPortfolios()
              .map((portfolios: Portfolio[]) => ({
                type: InvestmentActions.FETCH_PORTFOLIOS_FULFILLED_SUCCESS,
                payload: portfolios
              }));
          }).catch(error => Observable.of({
            type: InvestmentActions.FETCH_PORTFOLIOS_FULFILLED_FAILURE
          }));
      }

}

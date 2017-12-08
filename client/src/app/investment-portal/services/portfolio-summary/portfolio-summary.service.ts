import { Injectable } from '@angular/core';
import { IDashboardSummaryService } from './i-portfolio-summary.service';
import { NgRedux} from '@angular-redux/store';
import {AppState} from '../../store';
import { Observable} from 'rxjs/Observable';
import { PortfolioSummary} from '../../types/types';

@Injectable()
export class PortfolioSummaryService implements IDashboardSummaryService {

  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);
  chartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);

  constructor(
    private ngRedux: NgRedux<AppState>) {
    // TODO: Subscribe to portfolio data, and on their change, recompute the values in portfolio summary according to current {period} that is set.
    // TODO: Subscribe to set period.
    // TODO: Subscribe to list of selected portfolios

  }

  public computeSummary(): Observable<PortfolioSummary> {

    return;
  }

}

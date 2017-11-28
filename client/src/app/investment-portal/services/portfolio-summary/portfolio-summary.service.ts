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


  }

  public computeSummary(): Observable<PortfolioSummary> {

    return;
  }

}

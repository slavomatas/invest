import { Injectable } from '@angular/core';
import { IDashboardSummaryService } from "./i-portfolio-summary.service";

@Injectable()
export class PortfolioSummaryService implements IDashboardSummaryService {

  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);
  chartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);

  constructor(
    private ngRedux: NgRedux<AppState>) {


  }

  public computeSummary(): Observable<PortfolioSummary> {

    return
  }

}

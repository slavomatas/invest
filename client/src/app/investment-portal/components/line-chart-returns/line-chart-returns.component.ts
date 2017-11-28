import { Component, OnInit, NgModule} from '@angular/core';
import { ChartModelPortfolio, PortfolioSummary } from '../../types/types';
import { cloneDeep } from 'lodash';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-line-chart-returns',
  templateUrl: 'line-chart-returns.component.html',
  styleUrls: ['line-chart-returns.component.scss']
})
export class LineChartReturnsComponent implements OnInit {

  portfolioSummary$ =  this.ngRedux.select(state => state.portfolioSummary);
  chartModelPortfolios$ = this.ngRedux.select(state => state.chartPortfolios);

  chartSummaryObject: PortfolioSummary;

  private  definedPeriods:Map<string, string> = new Map([
    ['1M', 'last month'],
    ['3M', 'last 3 months'],
    ['6M', 'last 6 months'],
    ['9M', 'last 9 months'],
    ['12M', 'last 12 months'],
    ['ALL', 'all time']
  ]);

  constructor(
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>) {

    // subscribe on portfolioSummary from redux Store
    this.portfolioSummary$.subscribe((data: PortfolioSummary) => {
      if (data != null) {
        this.chartSummaryObject = cloneDeep(data);
      }
    });

    this.chartModelPortfolios$.subscribe();
  }

  ngOnInit() {
    this.chartSummaryObject.marketValue = this.numberWithCommas(Number(this.chartSummaryObject.marketValue));
    this.chartSummaryObject.periodReturn = this.numberWithCommas(Number(this.chartSummaryObject.periodReturn));
    this.chartSummaryObject.periodReturnPercentage = this.numberWithCommas(Number(this.chartSummaryObject.periodReturnPercentage));
  }

  private numberWithCommas(x) {
    x = (Math.round(x * 100)/100).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  periodEvent(event) {
    this.chartSummaryObject.selectedPeriod = event.srcElement.innerText;
    //change redux state
  }
}

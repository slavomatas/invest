import { Component, OnInit, NgModule} from '@angular/core';
import { ChartModelPortfolio, PortfolioSummary } from '../../types/types';
import { cloneDeep } from 'lodash';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fuse-invest-line-chart-returns',
  templateUrl: 'line-chart-returns.component.html',
  styleUrls: ['line-chart-returns.component.scss']
})
export class LineChartReturnsComponent implements OnInit {

  portfolioSummary$ =  this.ngRedux.select(state => state.portfolioSummary);
  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);
  currencySymbol$ = this.ngRedux.select(state => state.currencySymbol);

  portfolioSummaryObject: PortfolioSummary;
  currencySymbol: string;
  selectedPeriod: string;

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

    this.portfolioSummary$.subscribe((data: PortfolioSummary) => {
      if (data != null) {
        this.portfolioSummaryObject = cloneDeep(data);
      }
    });

    this.cumulativeChartSelectedPeriod$.subscribe((data: string) => {
      if (data != null) {
        this.selectedPeriod = data;
      }
    });

    this.currencySymbol$.subscribe((data: string) => {
      if (data != null) {
        this.currencySymbol = data;
      }
    });
  }

  ngOnInit() {
    this.portfolioSummaryObject.marketValue = this.numberWithCommas(Number(this.portfolioSummaryObject.marketValue));
    this.portfolioSummaryObject.periodMarketValue = this.numberWithCommas(Number(this.portfolioSummaryObject.periodMarketValue));
    this.portfolioSummaryObject.periodMarketValuePercentage = this.numberWithCommas(Number(this.portfolioSummaryObject.periodMarketValuePercentage));
  }

  private numberWithCommas(x) {
    x = (Math.round(x * 100)/100).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  periodEvent(event) {
    this.actions.setCumulativeChartPeriod(event.srcElement.innerText);
  }
}

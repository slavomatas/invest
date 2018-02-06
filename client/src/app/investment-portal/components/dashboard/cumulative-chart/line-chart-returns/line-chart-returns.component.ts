import { Component, OnInit, NgModule} from '@angular/core';
import { cloneDeep } from 'lodash';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ChartModelPortfolio, PortfolioSummary } from '../../../../types/dashboard-types';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { AppState } from '../../../../store/store';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';

@Component({
  selector: 'fuse-invest-line-chart-returns',
  templateUrl: 'line-chart-returns.component.html',
  styleUrls: ['line-chart-returns.component.scss']
})
export class LineChartReturnsComponent implements OnInit {

  selectedChartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios.filter(portfolio => portfolio.selected)) ;
  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);
  currencySymbol$ = this.ngRedux.select(state => state.currencySymbol);



  chartData: ChartModelPortfolio[] = [];
  currencySymbol: string;
  selectedPeriod: string;
  portfolioSummaryObject: PortfolioSummary = {
    marketValue: 0,
    periodMarketValue: 0,
    periodMarketValuePercentage: 0
  };

  private  definedPeriods: Map<string, string> = new Map([
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

    this.cumulativeChartSelectedPeriod$.subscribe((data: string) => {
      if (data != null) {
        this.selectedPeriod = data;
      }
    });

    this.selectedChartPortfolios$.subscribe((data: ChartModelPortfolio[]) => {

      let totalMarketValue = 0;
      let totalOldMarketValue = 0;

      for (const portfolio of data) {
        totalMarketValue += portfolio.marketValue;
        totalOldMarketValue += portfolio.oldMarketValue;
      }

      this.portfolioSummaryObject.marketValue = this.numberWithCommas(totalMarketValue);
      this.portfolioSummaryObject.periodMarketValue = this.numberWithCommas(totalOldMarketValue);
      this.portfolioSummaryObject.periodMarketValuePercentage = (totalMarketValue === 0) ? 0 : ((totalMarketValue - totalOldMarketValue) / totalMarketValue);
    });

    this.currencySymbol$.subscribe((data: string) => {
      if (data != null) {
        this.currencySymbol = data;
      }
    });
  }

  ngOnInit() {
  }

  private numberWithCommas(x) {
    x = (Math.round(x * 100) / 100).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  periodEvent(event) {
    this.actions.setCumulativeChartPeriod(event.srcElement.innerText);
  }
}

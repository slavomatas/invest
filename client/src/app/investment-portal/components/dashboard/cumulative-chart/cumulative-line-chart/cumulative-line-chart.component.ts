import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
// import {port} from '_debugger';
import { ChartModelPortfolio } from '../../../../types/dashboard-types';
import { colorScheme } from '../../../../constants/constants';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { AppState } from '../../../../store/store';

@Component({
  selector: 'invest-cumulative-line-chart',
  templateUrl: 'cumulative-line-chart.component.html',
  styleUrls: ['cumulative-line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  // EXAMPLE of other usage:
  // @select() readonly chartPortfolios$: Observable<ChartModelPortfolio[]>;
  // @select('chartPortfolios') chartPortfolios$: Observable<ChartModelPortfolio[]>;

  // select chart portfolios and filter just the one with selected === true
  selectedChartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios.filter(portfolio => portfolio.selected)) ;

  chartData: ChartModelPortfolio[] = [];

  // view: any[] = [900, 400];

  // options
  animations = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines= false;
  timeline = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '%';

  colorScheme = {
    domain: colorScheme
  };
  // line, area
  autoScale = true;

  constructor(
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>) {

    // subscribe on chartPortfolios from redux Store
    this.selectedChartPortfolios$.subscribe((data: ChartModelPortfolio[]) => {
      if (data != null && data.length > 0) {
        this.chartData = cloneDeep(data);
      }
    });

  }

  onSelect(event) {
    console.log(event);
  }


  ngOnInit() {

  }
}

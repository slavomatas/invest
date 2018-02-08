import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
// import {port} from '_debugger';
import { colorScheme } from '../../../../constants/constants';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { AppState } from '../../../../store/store';
import { PortfolioDetails } from '../../../../types/types';
import { getDateFrom } from '../../../../utils/portfolio-utils';

@Component({
  selector: 'invest-cumulative-line-chart',
  templateUrl: 'cumulative-line-chart.component.html',
  styleUrls: ['cumulative-line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  // EXAMPLE of other usage:
  // @select() readonly chartPortfolios$: Observable<ChartModelPortfolio[]>;
  // @select('chartPortfolios') chartPortfolios$: Observable<ChartModelPortfolio[]>;

  portfolioList$ =  this.ngRedux.select(state => state.portfolioList.filter(portfolio => portfolio.isDisplayed)) ;
  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);

  chartData: PortfolioDetails[] = [];
  tmpChartData: PortfolioDetails[] = [];
  cumulativeChartSelectedPeriod: string;

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
    
    this.cumulativeChartSelectedPeriod$.subscribe((selectedPeriod: string) => {
      if (selectedPeriod != null) {
        this.cumulativeChartSelectedPeriod = selectedPeriod;

        if (this.chartData != null && this.chartData.length > 0) {
          // get initial past date
          this.filterChartData();
        }
      }
    });

    // subscribe on chartPortfolios from redux Store
    this.portfolioList$.subscribe((reduxPortfolios: PortfolioDetails[]) => {
      if (reduxPortfolios != null && reduxPortfolios.length > 0) {
        this.chartData = cloneDeep(reduxPortfolios);
        this.filterChartData();
      }
    });

  }

  onSelect(event) {
    console.log(event);
  }


  ngOnInit() {

  }

  private filterChartData() {
    const pastDate = getDateFrom(new Date(), this.cumulativeChartSelectedPeriod);

    this.chartData.forEach((portfolio) => {
      portfolio.series = portfolio.series
        .filter((sero) => {
          const seroActDate = Date.parse(sero.name);
          const pastDateVal = pastDate.getTime();
          return seroActDate > pastDateVal;
        });
      // return portfolio;
    });
    
    this.chartData = cloneDeep(this.chartData);
  }
}

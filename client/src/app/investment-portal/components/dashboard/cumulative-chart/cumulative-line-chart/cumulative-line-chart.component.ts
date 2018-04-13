import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
// import {port} from '_debugger';
import { colorScheme } from '../../../../constants/constants';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { AppState } from '../../../../store/store';
import { PortfolioDetails, Portfolio } from '../../../../types/types';
import { getDateFrom, getDisplayedPortfolios, getPortfoliosColors } from '../../../../utils/portfolio-utils';

interface CumulativeChartData {
  name: string;
  series:
    {
      name: string,
      value: number
    }[];
}

@Component({
  selector: 'invest-cumulative-line-chart',
  templateUrl: 'cumulative-line-chart.component.html',
  styleUrls: ['cumulative-line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  // EXAMPLE of other usage:
  // @select() readonly chartPortfolios$: Observable<ChartModelPortfolio[]>;
  // @select('chartPortfolios') chartPortfolios$: Observable<ChartModelPortfolio[]>;

  portfolioList$ =  this.ngRedux.select(state => state.portfolioList) ;
  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);

  chartData: PortfolioDetails[] = [];
  tmpChartData: CumulativeChartData[] = [];
  cumulativeChartSelectedPeriod: string;
  dataEmpty = undefined;
  

  // view: any[] = [900, 400];

  // options
  animations = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines= false;
  timeline = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '%';
  showRefLines = true;
  showRefLabels = false;

  colorScheme = {
    domain: colorScheme
  };

  refLines = [
   
    { value: 0, name: 'zero' },
 
   ];
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
        this.chartData = cloneDeep(getDisplayedPortfolios(reduxPortfolios));
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

    this.dataEmpty = true;
    this.tmpChartData = [];
    this.chartData.forEach((portfolio) => {
      portfolio.series = portfolio.series
        .filter((sero) => {
          const seroActDate = Date.parse(sero.name);
          const pastDateVal = pastDate.getTime();
          return seroActDate > pastDateVal;
        });

      const tmpSeries = [];
      portfolio.series.forEach((sero, index) => {
        tmpSeries.push({
          name: new Date(sero.name),
          value: sero.value * 100
        });
      });


      this.tmpChartData.push({
        name: portfolio.name,
        series: tmpSeries
      });

      if (this.dataEmpty && portfolio.series.length > 0) {
        this.dataEmpty = false;
      }
      // return portfolio;
    });

    this.tmpChartData = cloneDeep(this.tmpChartData);
    this.colorScheme = {
      domain: getPortfoliosColors(this.chartData)
    };
  }

  yAxisFormat(val) {
    return val + '%';
  }
}

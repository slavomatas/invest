import { Component, OnInit } from '@angular/core';
import { Portfolio, CumulativeMeasurement, ChartModelPortfolio } from '../../types/types';
import { cloneDeep } from 'lodash';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs/Observable';
// import {port} from '_debugger';

@Component({
  selector: 'fuse-app-line-chart',
  templateUrl: 'line-chart.component.html',
  styleUrls: ['line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  // EXAMPLE of other usage:
  // @select() readonly chartPortfolios$: Observable<ChartModelPortfolio[]>;
  // @select('chartPortfolios') chartPortfolios$: Observable<ChartModelPortfolio[]>;

  chartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);

  chartData: ChartModelPortfolio[] = [];


  // view: any[] = [900, 400];

  // options
  animations = true;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#b71c1c', '#311b92', '#1b5e20', '#ff6f00', '#bf360c',  '#212121']
  };
  // line, area
  autoScale = true;

  constructor(
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>) {

    // subscribe on chartPortfolios from redux Store
    this.chartPortfolios$.subscribe((data: ChartModelPortfolio[]) => {
      if (data != null && data.length > 0) {
        // clear chart data from previous portfolios
        this.chartData = [];
        for (const portfolio of data) {
          // check wether push the portfolio into the chart
          if (portfolio.selected) {
            this.chartData.push(portfolio);
          }
        }
        this.chartData = cloneDeep(this.chartData);
      }
    });

  }

  onSelect(event) {
    console.log(event);
  }


  ngOnInit() {
    this.portfolioService.getPortfoliosCumulativeData().then((data: ChartModelPortfolio[]) => {
      this.actions.getPortfoliosComulativeDataFullfiled(true, data);
    });
  }
}

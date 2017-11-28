import { Component, OnInit } from '@angular/core';
import { PortfolioService} from '../../services/portfolio/portfolio.service';
import { PortfolioActions} from '../../store/actions/portfolio-actions';
import { NgRedux} from '@angular-redux/store';
import { AppState } from '../../store';
import {ChartModelPortfolio} from '../../types/types';

@Component({
  selector: 'fuse-invest-line-chart-legend',
  templateUrl: './line-chart-legend.component.html',
  styleUrls: ['./line-chart-legend.component.scss']
})
export class LineChartLegendComponent implements OnInit {

  chartPortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);
  // chartActivePortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);

  portfolios: ChartModelPortfolio[] = [];
  colors: string[] = ['#b71c1c', '#311b92', '#1b5e20', '#ff6f00', '#bf360c',  '#212121'];

  constructor(private portfolioService: PortfolioService,
              private actions: PortfolioActions,
              private ngRedux: NgRedux<AppState>) {
    this.chartPortfolios$.subscribe((data: ChartModelPortfolio[]) => {
      if (data != null && data.length > 0 ) {
        this.portfolios = data;
      }
    });
  }

  ngOnInit() {
  }

  legendEvent(event, index) {
    console.log(index);
    this.portfolios[index].selected = !this.portfolios[index].selected;
    // change redux state
  }
}

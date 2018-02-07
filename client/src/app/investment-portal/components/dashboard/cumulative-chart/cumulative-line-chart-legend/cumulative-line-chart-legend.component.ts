import { Component, OnInit } from '@angular/core';
import { NgRedux} from '@angular-redux/store';
import { colorScheme } from '../../../../constants/constants';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { AppState } from '../../../../store/store';
import { PortfolioTimeSeries } from '../../../../types/types';

@Component({
  selector: 'invest-cumulative-line-chart-legend',
  templateUrl: './cumulative-line-chart-legend.component.html',
  styleUrls: ['./cumulative-line-chart-legend.component.scss']
})
export class LineChartLegendComponent implements OnInit {

  portfolioTimeSeries$ =  this.ngRedux.select(state => state.portfolioTimeSeries);
  // chartActivePortfolios$ =  this.ngRedux.select(state => state.chartPortfolios);

  portfolios: PortfolioTimeSeries[] = [];
  colors = colorScheme;

  constructor(private portfolioService: PortfolioService,
              private actions: PortfolioActions,
              private ngRedux: NgRedux<AppState>) {
    this.portfolioTimeSeries$.subscribe((data: PortfolioTimeSeries[]) => {
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
    this.actions.setPortfolioCumulativeChartSelected(this.portfolios);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgRedux} from '@angular-redux/store';
import { colorScheme } from '../../../../constants/constants';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { AppState } from '../../../../store/store';
import { PortfolioDetails } from '../../../../types/types';
import { cloneDeep } from 'lodash';
import { getDisplayedPortfolios } from '../../../../utils/portfolio-utils';

@Component({
  selector: 'invest-cumulative-line-chart-legend',
  templateUrl: './cumulative-line-chart-legend.component.html',
  styleUrls: ['./cumulative-line-chart-legend.component.scss']
})
export class LineChartLegendComponent implements OnInit {

  portfolioList$ =  this.ngRedux.select(state => state.portfolioList);

  portfolios: PortfolioDetails[] = [];
  colors = colorScheme;

  constructor(private portfolioService: PortfolioService,
              private actions: PortfolioActions,
              private ngRedux: NgRedux<AppState>) {
    this.portfolioList$.subscribe((data: PortfolioDetails[]) => {
      if (data != null && data.length > 0 ) {
        this.portfolios = data.filter(portfolio => !portfolio.closed);
      }
    });
  }

  ngOnInit() {
  }

  legendEvent(event, index) {
    console.log('legend clicket index', index);
    this.portfolios[index].isDisplayed = !this.portfolios[index].isDisplayed;

    this.actions.getPortfolios(true, cloneDeep(this.portfolios));

  }
}

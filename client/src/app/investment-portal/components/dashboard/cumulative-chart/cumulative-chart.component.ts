import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../store/store';
import { PortfolioDetails, PortfolioTimeSeries } from '../../../types/types';

@Component({
  selector: 'invest-cumulative-chart',
  templateUrl: './cumulative-chart.component.html',
  styleUrls: ['./cumulative-chart.component.scss']
})
export class CumulativeChartComponent implements OnInit {

  selectedPeriod: string;

  constructor(
    private actions: PortfolioActions,
    private portfolioService: PortfolioService,
    private ngRedux: NgRedux<AppState>
  ) {

  }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import { ChartModelPortfolio } from "../../../types/dashboard-types";
import { PortfolioService } from "../../../services/portfolio/portfolio.service";
import { PortfolioActions } from "../../../store/actions/portfolio-actions";

import { NgRedux, select } from '@angular-redux/store';
import { AppState } from '../../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fuse-app-cumulative-chart',
  templateUrl: './cumulative-chart.component.html',
  styleUrls: ['./cumulative-chart.component.scss']
})
export class CumulativeChartComponent implements OnInit {

  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);

  selectedPeriod: string;

  constructor(
    private actions: PortfolioActions,
    private portfolioService: PortfolioService,
    private ngRedux: NgRedux<AppState>
  ) {

    this.cumulativeChartSelectedPeriod$.subscribe((data: string) => {
      console.log(data);
      if (data != null) {
        this.selectedPeriod = data;

        let dateFrom: Date = new Date();
        const dateTo: Date = new Date();

        switch(this.selectedPeriod) {
          case '1M': {
            dateFrom.setMonth(dateTo.getMonth() - 1);
            break;
          }
          case '3M': {
            dateFrom.setMonth(dateTo.getMonth() - 3);
            break;
          }
          case '6M': {
            dateFrom.setMonth(dateTo.getMonth() - 6);
            break;
          }
          case '9M': {
            dateFrom.setMonth(dateTo.getMonth() - 9);
            break;
          }
          case '12M': {
            dateFrom.setFullYear(dateTo.getFullYear() - 1);
            break;
          }
          default: {
            dateFrom = null;
            break;
          }
        }
        this.portfolioService.getPortfoliosCumulativeData(dateFrom, dateTo).then((data: ChartModelPortfolio[]) => {
          this.actions.getPortfoliosComulativeDataFullfiled(true, data);
        });
      }
    });

  }

  ngOnInit() {

  }

}

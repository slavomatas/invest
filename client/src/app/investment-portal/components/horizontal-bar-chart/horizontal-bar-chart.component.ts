import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux } from '@angular-redux/store';
import { PortfolioDetails } from '../../types/types';
import { forEach } from '@angular/router/src/utils/collection';
import { colorScheme } from '../../constants/constants';
import { AppState } from '../../store/store';

@Component({
  selector: 'invest-horizontal-bar-chart',
  templateUrl: 'horizontal-bar-chart.component.html',
  styleUrls: ['horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  @Input() portfolioDetailsList: PortfolioDetails[];
  portfoliosNum = 1;
  single: any = [];

  // Options of chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = false;
  xAxisLabel = 'Gain/Loss %';
  xScaleMax = 0.001;
  showYAxisLabel = true;
  yAxisLabel = '';
  barPadding = 155;
  view = [700, 230 * this.portfoliosNum];

  colorScheme = {
    domain: colorScheme
  };

  constructor(
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const portfolio of this.portfolioDetailsList) {
      this.single.push(
        {
          'name': portfolio.name,
          'value': portfolio.returns.daily
        }
      );
    }
    this.portfoliosNum = this.portfolioDetailsList.length;
    this.view = [700, 250 * this.portfoliosNum];
  }
  ngOnInit() {

  }

  onSelect(event) {
    console.log(event);
  }
}

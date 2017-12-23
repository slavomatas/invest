import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store';
import { PortfolioDetails } from '../../types/types';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'invest-horizontal-bar-chart',
  templateUrl: 'horizontal-bar-chart.component.html',
  styleUrls: ['horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  @Input() portfolioDetailsList: PortfolioDetails[];
  single: any = [];

  // Options of chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Gain/Loss %';
  showYAxisLabel = true;
  yAxisLabel = '';
  barPadding = 100;
  view = [700, 800];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
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
          'value': portfolio.returns.weekly
        }
      );
    }

  }
  ngOnInit() {

  }

  onSelect(event) {
    console.log(event);
  }
}

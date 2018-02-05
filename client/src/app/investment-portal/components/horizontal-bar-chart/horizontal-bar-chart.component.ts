import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store';
import { PortfolioDetails } from '../../types/types';
import { forEach } from '@angular/router/src/utils/collection';
import {SharedVariableService} from '../../services/shared-variable-service/shared-variable.service';

@Component({
  selector: 'invest-horizontal-bar-chart',
  templateUrl: 'horizontal-bar-chart.component.html',
  styleUrls: ['horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  @Input() portfolioDetailsList: PortfolioDetails[];
  portfoliosNum: number = 1;
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
    domain: this.sharedVariableService.getColors()
  };

  constructor(
    private actions: PortfolioActions,
    private sharedVariableService: SharedVariableService,
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

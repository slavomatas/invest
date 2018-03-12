import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PortfolioDetails } from '../../../../types/types';
import { colorScheme } from '../../../../constants/constants';

@Component({
  selector: 'invest-horizontal-bar-chart',
  templateUrl: 'horizontal-bar-chart.component.html',
  styleUrls: ['horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnChanges {
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
  view = [, 250 * this.portfoliosNum];

  colorScheme = {
    domain: colorScheme
  };

  constructor( ) {  }

  ngOnChanges(changes: SimpleChanges) {
    this.single = [];
    for (const portfolio of this.portfolioDetailsList) {
      this.single.push(
        {
          'name': portfolio.name,
          'value': portfolio.lastChangeAbs
        }
      );
    }
    this.portfoliosNum = this.portfolioDetailsList.length;
    this.view = [, 250 * this.portfoliosNum];
  }

  onSelect(event) {
    console.log(event);
  }
}

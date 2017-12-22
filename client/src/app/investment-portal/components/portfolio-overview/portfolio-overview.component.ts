import { Component, OnInit, Input } from '@angular/core';
import { cloneDeep } from 'lodash';
import { PortfolioDetails } from '../../types/types';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'invest-app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss']
})
export class PortfolioOverviewComponent implements OnInit {
  @Input() portfolioDetails: PortfolioDetails;

  chartData: ChartData[];
  percentage: number;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#23684A']
  };

  constructor() { }

  ngOnInit() {
    this.updatePercentage(this.portfolioDetails.oldMarketValue, this.portfolioDetails.marketValue);
    this.setChartData(this.portfolioDetails.positions);
  }

  onSelect(event) {
    console.log(event);
  }

  private setChartData(newData: ChartData[]) {
    this.chartData = cloneDeep(newData);
  }

  private updatePercentage(oldMarketValue: number, newMarketValue: number) {
    this.percentage = (((newMarketValue - oldMarketValue) / newMarketValue));
  }

}

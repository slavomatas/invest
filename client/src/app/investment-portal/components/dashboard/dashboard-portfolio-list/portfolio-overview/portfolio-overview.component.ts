import { Component, Input, OnChanges } from '@angular/core';
import { cloneDeep } from 'lodash';
import {forEach} from '@angular/router/src/utils/collection';
import { PortfolioDetails } from '../../../../types/types';
import { colorScheme } from '../../../../constants/constants';
import { Router } from '@angular/router';

interface ChartData {
  name: string;
  value: number;
}

interface Position {
  symbol: string;
  value: number;
}

@Component({
  selector: 'invest-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss']
})
export class PortfolioOverviewComponent implements OnChanges {
  @Input() portfolioDetails: PortfolioDetails;

  chartData: ChartData[] = [];
  percentage: number;

  colorScheme = {
    domain: colorScheme
  };

  constructor(
    private router: Router
   ) { }

  ngOnChanges() {
    this.percentage = this.portfolioDetails.lastChangePct;
    this.setChartData(this.portfolioDetails.positions);
  }

  onSelect(portfolioId) {
    this.router.navigate(['/portfolios/' + portfolioId + '/overview']);
  }

  private setChartData(newData: Position[]) {
    for (const position of newData) {
      this.chartData.push(
        {
          'name': position.symbol,
          'value': position.value
        }
      );
    }
  }
}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PortfolioPosition, PortfolioDetails } from '../../../../types/types';
import { cloneDeep } from 'lodash';

export interface Single {
  name: string;
  series: any;
}

@Component({
  selector: 'invest-portfolio-detail-positions',
  templateUrl: './portfolio-detail-positions.component.html',
  styleUrls: ['./portfolio-detail-positions.component.scss']
})

export class PortfolioDetailPositionsComponent implements OnChanges, OnInit {

  @Input() portfolio: PortfolioDetails;
  
  portfolioTableColumns: string[] = [];
  positions: PortfolioPosition[];

  chartData: {name: string, series: {name: string, value: number}[]}[] = [];

  onSelect(event) {
    console.log(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    const newPortfolio: PortfolioDetails = changes['portfolio'].currentValue;

    this.positions = newPortfolio.positions;
    const newPositions: PortfolioPosition[] = newPortfolio.positions;

    if (newPositions) {
      const newArray = [];
      newPositions.forEach((position: PortfolioPosition) => {
        const cData = {
          name: position.symbol,
          series: position.priceLast20Days
        };

        newArray.push(cData);
      });

      this.chartData = cloneDeep(newArray);
    }
  }

  ngOnInit() {
  }

  constructor() { 

    this.portfolioTableColumns = [
      'SYMBOL',
      'NAME',
      'QUANTITY',
      'PRICE',
      'PRICE LAST 20 DAYS',
      'MKT VALUE',
      'LAST CHANGE',
      ''
    ];

  }

}

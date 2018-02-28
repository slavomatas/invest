import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PortfolioDetails, PortfolioPosition } from '../../../../types/types';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'invest-portfolio-detail-trades',
  templateUrl: './portfolio-detail-trades.component.html',
  styleUrls: ['./portfolio-detail-trades.component.scss']
})
export class PortfolioDetailTradesComponent implements OnInit, OnChanges {

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
      'BUY/SELL',
      'TRADE DATE',
      'QUANTITY',
      'TRADE PRICE',
      ''
    ];

  }

}

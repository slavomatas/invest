import { Component, OnInit } from '@angular/core';
import { PortfolioPosition } from '../../../types/types';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
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

  portfolioTableColumns: string[] = [];
  positions: PortfolioPosition[];

  chartData: {name: string, series: {name: string, value: number}[]}[] = [];

  onSelect(event) {
    console.log(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    const newPositions: PortfolioPosition[] = changes['positions'].currentValue;
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
    ];

    this.positions = [
      {
        symbol: 'SPY',
        value: null,
        name: 'SPDR S&P 500 ETF',
        quantity: 20,
        price: 68.54,
        currency: 'NYSE ARCA',
        priceLast20Days: [
          {
            name: '1',
            value: 7300000
          },
          {
            name: '2',
            value: 8940000
          },
          {
            name: '3',
            value: 3040000
          },
          {
            name: '4',
            value: 2140000
          },
          {
            name: '5',
            value: 8940000
          },
          {
            name: '6',
            value: 3040000
          },
          {
            name: '7',
            value: 2140000
          },
          {
            name: '8',
            value: 8940000
          },
          {
            name: '9',
            value: 3040000
          },
          {
            name: '10',
            value: 2140000
          }
        ],
        lastChange: 10200,
        trades: [
          {
            tradeId: 1,
            price: 1.12,
            amount: 10,
            dateTime: '1518175018834',
          }
        ]
      },
      {
        symbol: 'CEW',
        value: null,
        name: 'SPDR S&P 500 ETF',
        quantity: 20,
        price: 68.54,
        currency: 'NYSE ARCA',
        priceLast20Days: [
          {
            name: '2010',
            value: 5000000
          },
          {
            name: '2011',
            value: 8240000
          }
        ],
        lastChange: 10200,
        trades: [
          {
            tradeId: 1,
            price: 1.12,
            amount: 10,
            dateTime: '1518175018834',
          }
        ]
      },
    ];


    const newArray = [];
      this.positions.forEach((position: PortfolioPosition) => {
        const cData = {
          name: position.symbol,
          series: position.priceLast20Days
        };

        newArray.push(cData);
      });

      this.chartData = cloneDeep(newArray);


  }

}

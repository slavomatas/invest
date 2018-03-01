import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PortfolioDetails, PortfolioPosition, Trade, TransactionTypes } from '../../../../types/types';
import { cloneDeep } from 'lodash';
import { TradeFormObject, EditPositionDialogComponent } from '../../../portfolio-detail-overview/edit-position-dialog/edit-position-dialog.component';
import * as moment from 'moment';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { MatDialog } from '@angular/material';
import { updateTradeInPortfolio } from '../../../../utils/portfolio-utils';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';

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

  constructor(
    private portfolioService: PortfolioService,
    public dialog: MatDialog,
    private portfolioActions: PortfolioActions
  ) {

    this.portfolioTableColumns = [
      'SYMBOL',
      'BUY/SELL',
      'TRADE DATE',
      'QUANTITY',
      'TRADE PRICE',
      ''
    ];

  }

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

  onEditTrade(trade: Trade, symbol: string) {
    let realAmount = Math.abs(trade.amount);
    let realTransactionType = TransactionTypes.BUY;
    if (trade.amount < 0) {
      realTransactionType = TransactionTypes.SELL;
    }

    const emptyTrade: TradeFormObject = {
      tradeId: trade.tradeId,
      transactionType: realTransactionType,
      timestamp: trade.dateTime,
      price: trade.price,
      amount: realAmount,
      symbol: symbol,
    };

    const dialogRef = this.dialog.open(EditPositionDialogComponent, {
      data: { trade: emptyTrade }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        realAmount = 0;
        if (result.transactionType === TransactionTypes.BUY) {
          realAmount = result.amount;
        } else {
          realAmount = 0 - result.amount;
        }

        const editedTrade: Trade = {
          tradeId: result.tradeId,
          price: result.price,
          amount: realAmount,
          dateTime: moment(result.timestamp).format('YYYY-MM-DD HH:mm:ss')
        };

        this.portfolioService.editTrade(editedTrade, this.portfolio.id, result.symbol).then((updatedTrade: Trade) => {
          updateTradeInPortfolio(this.portfolio, result.symbol, updatedTrade);
          this.portfolioActions.updatePortfolio(this.portfolio);
        });
      }
    });
  }

}

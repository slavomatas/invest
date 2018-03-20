import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PortfolioDetails, PortfolioPosition, Trade, TransactionTypes } from '../../../../types/types';
import { cloneDeep } from 'lodash';
import { TradeFormObject, EditPositionDialogComponent, DialogTitle } from '../../../portfolio-detail-overview/edit-position-dialog/edit-position-dialog.component';
import * as moment from 'moment';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { updateTradeInPortfolio } from '../../../../utils/portfolio-utils';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';

interface PositionTrade {
  symbol: string;
  tradeId: number;
  price: number;
  amount: number;
  dateTime: string;
}

@Component({
  selector: 'invest-portfolio-detail-trades',
  templateUrl: './portfolio-detail-trades.component.html',
  styleUrls: ['./portfolio-detail-trades.component.scss']
})

export class PortfolioDetailTradesComponent implements OnChanges {

  @Input() portfolio: PortfolioDetails;

  // @ViewChild(MatSort) sort: MatSort;

  positions: PortfolioPosition[];

  dataSource: MatTableDataSource<TradeFormObject>;

  displayedColumns = ['symbol', 'transactionType', 'timestamp', 'quantity', 'price', 'buttons'];

  constructor(
    private portfolioService: PortfolioService,
    public dialog: MatDialog,
    private portfolioActions: PortfolioActions
  ) {}


  onSelect(event) {
    console.log(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    const newPortfolio: PortfolioDetails = changes['portfolio'].currentValue;

    this.positions = newPortfolio.positions;
    
    if ( this.positions ) {
      const tradeList: TradeFormObject[] = [];
      this.positions.forEach(position => {
        if (position.trades) {
          position.trades.forEach(trade => {
            let newTrade: TradeFormObject;
            newTrade = {
              symbol: position.symbol,
              tradeId: trade.tradeId,
              price: trade.price,
              amount: trade.amount,
              timestamp: trade.dateTime,
              transactionType: (trade.amount >= 0 ? TransactionTypes.BUY : TransactionTypes.SELL)
            };
    
            tradeList.push(newTrade);
          });
        }
      });
      this.dataSource = new MatTableDataSource(tradeList);
    }
  }

  onEditTrade(trade: TradeFormObject, symbol: string) {
    let realAmount = Math.abs(trade.amount);
    let realTransactionType = TransactionTypes.BUY;
    if (trade.amount < 0) {
      realTransactionType = TransactionTypes.SELL;
    }

    const emptyTrade: TradeFormObject = {
      tradeId: trade.tradeId,
      transactionType: realTransactionType,
      timestamp: trade.timestamp,
      price: trade.price,
      amount: realAmount,
      symbol: symbol,
    };

    const dialogRef = this.dialog.open(EditPositionDialogComponent, {
      data: { trade: emptyTrade,
        dialogTitle: DialogTitle.EDIT
      }
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

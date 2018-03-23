import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PortfolioPosition, PortfolioDetails, TransactionTypes, Trade } from '../../../../types/types';
import { cloneDeep } from 'lodash';
import { TradeFormObject, EditPositionDialogComponent, DialogTitle } from '../../../portfolio-detail-overview/edit-position-dialog/edit-position-dialog.component';
import * as moment from 'moment';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { updateTradeInPortfolio } from '../../../../utils/portfolio-utils';


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

  positions: PortfolioPosition[];
  dataSource: MatTableDataSource<PortfolioPosition>;

  displayedColumns = ['symbol', 'name', 'quantity', 'price', 'priceLast20Days', 'value', 'lastChange', 'buttons'];

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
    this.dataSource = new MatTableDataSource(newPortfolio.positions);
  }

  ngOnInit() {
  }

  createTrade(type: TransactionTypes, inputSymbol: string) {
    const emptyTrade: TradeFormObject = {
      tradeId: 0,
      transactionType: type,
      timestamp: Date(),
      price: 0,
      amount: 0,
      symbol: inputSymbol,
    };

    const dialogRef = this.dialog.open(EditPositionDialogComponent, {
      data: { 
        trade: emptyTrade,
        dialogTitle: DialogTitle.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let realAmount = 0;
        if (result.transactionType === TransactionTypes.BUY) {
          realAmount = result.amount;
        } else {
          realAmount = 0 - result.amount;
        }

        const trade: Trade = {
          tradeId: result.tradeId,
          price: result.price,
          amount: realAmount,
          dateTime: moment(result.timestamp).format('YYYY-MM-DD HH:mm:ss')
        };

        this.portfolioService.createTrade(trade, this.portfolio.id, result.symbol).then((createdTrade: Trade) => {
          updateTradeInPortfolio(this.portfolio, result.symbol, createdTrade);
          this.portfolioActions.updatePortfolio(this.portfolio);
        });
      }
    });
  }

  onBuy(symbol: string) {
    this.createTrade(TransactionTypes.BUY, symbol);
  }

  onSell(symbol: string) {
    this.createTrade(TransactionTypes.SELL, symbol);
  }

}

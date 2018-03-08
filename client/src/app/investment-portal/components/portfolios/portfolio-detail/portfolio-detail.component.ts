import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioDetails, PortfolioPosition, TransactionTypes, Trade } from '../../../types/types';
import { ActivatedRoute } from '@angular/router';
import { findPortfolioById, updateTradeInPortfolio } from '../../../utils/portfolio-utils';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../store/store';
import { cloneDeep } from 'lodash';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';
import { EditPositionDialogComponent, TradeFormObject } from '../../portfolio-detail-overview/edit-position-dialog/edit-position-dialog.component';
import * as moment from 'moment';


@Component({
  selector: 'invest-portfolio-detail',
  templateUrl: 'portfolio-detail.component.html',
  styleUrls: ['portfolio-detail.component.scss']
})

export class PortfolioDetailComponent implements OnInit, OnDestroy {

  displayedColumns = ['marketValue', 'latestChange', 'week', 'month', 'year', 'all'];
  dataSource: MatTableDataSource<PortfolioDetails>;

  portfolioList$ = this.ngRedux.select(state => state.portfolioList);
  portfolios: PortfolioDetails[];
  reduxPortfolio: PortfolioDetails;

  portfolioId: number;
  private paramsSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>,
    private portfolioService: PortfolioService,
    private portfolioActions: PortfolioActions,
    public dialog: MatDialog,
  ) {

    this.portfolioList$.subscribe((reduxPortfolios: PortfolioDetails[]) => {
      if (reduxPortfolios != null && reduxPortfolios.length > 0) {
        this.portfolios = cloneDeep((reduxPortfolios));
      }
    });
  }

  onResize() {
    this.reduxPortfolio = cloneDeep(this.reduxPortfolio);
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.portfolioId = +params['id'];
      this.reduxPortfolio = findPortfolioById(this.portfolios, this.portfolioId);

      // prepare data for table
      const portfolioSource: PortfolioDetails[] = [];
      portfolioSource.push(this.reduxPortfolio);
      this.dataSource = new MatTableDataSource(portfolioSource);

      // get trades from BE
      this.portfolioService.getPortfolioPositions(this.reduxPortfolio).then((positions: PortfolioPosition[]) => {
        this.reduxPortfolio.positions = positions;
        this.reduxPortfolio = cloneDeep(this.reduxPortfolio);
        this.portfolioActions.updatePortfolio(this.reduxPortfolio);
      });

    });
  }

  onCreateTrade() {
    const emptyTrade: TradeFormObject = {
      tradeId: 0,
      transactionType: TransactionTypes.BUY,
      timestamp: Date(),
      price: 0,
      amount: 0,
      symbol: '',
    };

    const dialogRef = this.dialog.open(EditPositionDialogComponent, {
      data: { trade: emptyTrade }
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

        this.portfolioService.createTrade(trade, this.portfolioId, result.symbol).then((createdTrade: Trade) => {
          updateTradeInPortfolio(this.reduxPortfolio, result.symbol, createdTrade);
          this.reduxPortfolio = cloneDeep(this.reduxPortfolio);
          this.portfolioActions.updatePortfolio(this.reduxPortfolio);
        });
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  formatNumber(num: number, negativeSign: Boolean, decimalPlaces: number){

    if (negativeSign && num < 0) {
      num *= -1;
    }
    return num.toFixed(decimalPlaces);
  }

}



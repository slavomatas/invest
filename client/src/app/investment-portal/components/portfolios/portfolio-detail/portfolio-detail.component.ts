import { Component, OnInit, OnDestroy } from '@angular/core';
import {PortfolioDetails, PortfolioPosition, TransactionTypes, Trade, TypeOfPortfolio} from '../../../types/types';
import { ActivatedRoute } from '@angular/router';
import { findPortfolioById, updateTradeInPortfolio } from '../../../utils/portfolio-utils';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../store/store';
import { cloneDeep } from 'lodash';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';
import { EditPositionDialogComponent, TradeFormObject, DialogTitle } from '../../portfolio-detail-overview/edit-position-dialog/edit-position-dialog.component';
import * as moment from 'moment';
import { TourService, IStepOption } from 'ngx-tour-md-menu';
import { demandPortfolioDetailTour } from '../../../toures/tour-definitions';


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
  modelPortfolioList$ = this.ngRedux.select(state => state.modelPortfolioList);
  modelPortfolios: PortfolioDetails[];
  reduxPortfolio: PortfolioDetails;

  portfolioId: number;
  private paramsSubscription: any;
  currentTabIndex: number = 0;

  tourRunning: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>,
    private portfolioService: PortfolioService,
    private portfolioActions: PortfolioActions,
    public dialog: MatDialog,
    public tourService: TourService
  ) {

    this.portfolioList$.subscribe((reduxPortfolios: PortfolioDetails[]) => {
      if (reduxPortfolios != null && reduxPortfolios.length > 0) {

        this.portfolios = cloneDeep((reduxPortfolios));
        if (this.portfolioId) {
          this.update();
        }

      }
    });

    // Following three event hooks are ugly workaround. Problem is we need to swap between two tabs during the tour.
    // We can subscribe to stepShow$ event, but at that point the step is already shown, but tab is not yet swapped.
    // That means that step content does not know to which element it should be displayed, so it's nowhere (it's position is undefined)
    // Therefore we must start the tour again from specific step (the first step on the tab that needs to be swapped), to force updating step's position.
    this.tourService.stepShow$.subscribe((step: IStepOption) => {
      if (step.anchorId === 'portfolio-detail-step-8') {
        if (this.currentTabIndex === 0) {
          this.onIndexChange(1);
          setTimeout(
            () => {
              this.tourService.startAt(7);
            }, 500
          ); 
        } 
      } else if (step.anchorId === 'portfolio-detail-step-7') {
        if (this.currentTabIndex === 1) {
          this.onIndexChange(0);
          setTimeout(
            () => {
              this.tourService.startAt(6);
            }, 500
          ); 
        } 
      }
    });

    this.tourService.end$.subscribe(() => {
      this.tourRunning = false;
    });

    this.tourService.start$.subscribe(() => {
      if (!this.tourRunning) {
        this.onIndexChange(0);
        this.tourRunning = true;
      }
      
    });
    this.modelPortfolioList$.subscribe((reduxPortfolios: PortfolioDetails[]) => {
      if (reduxPortfolios != null && reduxPortfolios.length > 0) {

        this.modelPortfolios = cloneDeep((reduxPortfolios));
        if (this.portfolioId) {
          this.update();
        }

      }
    });

    this.tourService.events$.subscribe(x => console.log(x));
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.portfolioId = +params['id'];
      this.update();

       // get trades from BE
       this.portfolioService.getPortfolioPositions(this.reduxPortfolio).then((positions: PortfolioPosition[]) => {
        this.reduxPortfolio.positions = positions;
        console.log("REST positions: ");
        console.log(positions);
        console.log(this.reduxPortfolio.positions);
        this.reduxPortfolio = cloneDeep(this.reduxPortfolio);
        this.portfolioActions.updatePortfolio(this.reduxPortfolio);
        this.portfolioActions.updateModelPortfolio(this.reduxPortfolio);
        this.update();
      });
    });
  }

  startGuideClick() {

    this.tourService.initialize(demandPortfolioDetailTour);
    this.tourService.start();
  }

  // need to call update of reduxPortfolio every time when something changes in REDUX so the change reflects in child elements with @Input
  update() {
      this.reduxPortfolio = findPortfolioById(this.portfolios, this.portfolioId);

      if (this.reduxPortfolio == undefined) {
        this.reduxPortfolio = findPortfolioById(this.modelPortfolios, this.portfolioId);
      }

      // prepare data for table
      const portfolioSource: PortfolioDetails[] = [];
      portfolioSource.push(this.reduxPortfolio);
      this.dataSource = new MatTableDataSource(portfolioSource);


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

        this.portfolioService.createTrade(trade, this.portfolioId, result.symbol).then((createdTrade: Trade) => {
          updateTradeInPortfolio(this.reduxPortfolio, result.symbol, createdTrade);
          this.reduxPortfolio = cloneDeep(this.reduxPortfolio);
          this.portfolioActions.updatePortfolio(this.reduxPortfolio);
          this.portfolioActions.updateModelPortfolio(this.reduxPortfolio);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription !== undefined) {
      this.paramsSubscription.unsubscribe();
    }
  }

  formatNumber(num: number = 0, negativeSign: Boolean, decimalPlaces: number){

    if (negativeSign && num < 0) {
      num *= -1;
    }
    return num.toFixed(decimalPlaces);
  }

  onMatTabClick() {
    this.reduxPortfolio = cloneDeep(this.reduxPortfolio);
  }

  onIndexChange(newValue: number) {
    this.currentTabIndex = newValue;
  }
}



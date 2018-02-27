import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfolioDetails, PortfolioPosition } from '../../../types/types';
import { ActivatedRoute } from '@angular/router';
import { findPortfolioById } from '../../../utils/portfolio-utils';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../store/store';
import { cloneDeep } from 'lodash';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';


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
    private portfolioAcitions: PortfolioActions
  ) {

    this.portfolioList$.subscribe((reduxPortfolios: PortfolioDetails[]) => {
      if (reduxPortfolios != null && reduxPortfolios.length > 0) {
        this.portfolios = cloneDeep((reduxPortfolios));
      }
    });
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
        this.portfolioAcitions.updatePortfolio(this.reduxPortfolio);
      });

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



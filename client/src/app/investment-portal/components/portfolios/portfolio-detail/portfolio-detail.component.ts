import { Component, OnInit } from '@angular/core';
import { PortfolioDetails } from '../../../types/types';
import { ActivatedRoute } from '@angular/router';
import { findPortfolioById } from '../../../utils/portfolio-utils';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../store/store';
import { cloneDeep } from 'lodash';
import { MatTableModule } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'invest-portfolio-detail',
  templateUrl: 'portfolio-detail.component.html',
  styleUrls: ['portfolio-detail.component.scss']
})

export class PortfolioDetailComponent implements OnInit {

  displayedColumns = ['marketValue', 'latestChange', 'week', 'month', 'year', 'all'];
  dataSource: MatTableDataSource<PortfolioDetails>;

  portfolioList$ = this.ngRedux.select(state => state.portfolioList);
  portfolios: PortfolioDetails[];
  portfolio: PortfolioDetails;

  portfolioId: number;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private ngRedux: NgRedux<AppState>
  ) {

    this.portfolioList$.subscribe((reduxPortfolios: PortfolioDetails[]) => {
      if (reduxPortfolios != null && reduxPortfolios.length > 0) {
        this.portfolios = cloneDeep((reduxPortfolios));
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.portfolioId = +params['id'];
      this.portfolio = findPortfolioById(this.portfolios, this.portfolioId);

      const portfolioSource: PortfolioDetails[] = [];
      portfolioSource.push(this.portfolio);

      this.dataSource = new MatTableDataSource(portfolioSource);
    });

    console.log(JSON.stringify(this.portfolio));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}



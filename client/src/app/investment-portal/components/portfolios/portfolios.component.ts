import { Component, OnInit } from '@angular/core';
import { PortfolioDetails } from '../../types/types';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/store';
import { PortfolioPosition } from '../../types/types';
import { PortfolioDetailPositionsComponent} from './portfolio-detail-positions/portfolio-detail-positions.component';

@Component({
  selector: 'invest-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  portfolioList$ = this.ngRedux.select(state => state.portfolioList);

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
  }

}

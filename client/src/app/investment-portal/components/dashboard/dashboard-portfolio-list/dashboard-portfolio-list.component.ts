import { Component, OnInit } from '@angular/core';
import {MockPortfolioService, PortfolioService} from '../../../services/portfolio/portfolio.service';
import {PortfolioActions} from '../../../store/actions/portfolio-actions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../store';
import {PortfolioDetails, TypeOfPortfolioReturn} from '../../../types/types';



@Component({
  selector: 'fuse-app-dashboard-portfolio-list',
  templateUrl: './dashboard-portfolio-list.component.html',
  styleUrls: ['./dashboard-portfolio-list.component.scss']
})
export class DashboardPortfolioListComponent implements OnInit {

  dashboardPortfolioList$ =  this.ngRedux.select(state => state.dashboardPortfolioList) ;
  dashboardPortfolioList: PortfolioDetails[] = [];

  constructor(
    private portfolioService: MockPortfolioService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>) {
    this.dashboardPortfolioList$.subscribe((data: PortfolioDetails[]) => {
      // console.log(data);
    });

  }

  ngOnInit() {
    this.portfolioService.getPortfoliosListDetails(TypeOfPortfolioReturn.weekly).then((data: PortfolioDetails[]) => {
      this.actions.getPortfoliosListDetails(true, data);
    });
    // this.portfolioService.getPortfoliosCumulativeData().then((data: ChartModelPortfolio[]) => {
    //   this.actions.getPortfoliosComulativeDataFullfiled(true, data);
    // });
  }

}

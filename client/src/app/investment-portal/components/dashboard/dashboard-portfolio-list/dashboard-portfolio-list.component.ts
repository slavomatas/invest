import { Component, OnInit } from '@angular/core';
import {PortfolioService} from '../../../services/portfolio/portfolio.service';
import {PortfolioActions} from '../../../store/actions/portfolio-actions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../store';
import {PortfolioDetails, TypeOfPortfolioReturn} from '../../../types/types';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'fuse-app-dashboard-portfolio-list',
  templateUrl: './dashboard-portfolio-list.component.html',
  styleUrls: ['./dashboard-portfolio-list.component.scss']
})
export class DashboardPortfolioListComponent implements OnInit {

  dashboardPortfolioList$ =  this.ngRedux.select(state => state.dashboardPortfolioList) ;
  dashboardPortfolioList: PortfolioDetails[];

  constructor(
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>) {
    this.dashboardPortfolioList$.subscribe((data: PortfolioDetails[]) => {
      this.dashboardPortfolioList = cloneDeep(data);
    });

  }

  ngOnInit() {
    this.portfolioService.getPortfoliosListDetails(TypeOfPortfolioReturn.daily).then((data: PortfolioDetails[]) => {
      this.actions.getPortfoliosListDetails(true, data);
    });

  }

}

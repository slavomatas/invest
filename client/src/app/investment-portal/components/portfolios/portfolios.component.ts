import { Component, OnInit, Input } from '@angular/core';
import { PortfolioDetails, TypeOfPortfolio } from '../../types/types';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/store';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { cloneDeep } from 'lodash';
import { TourService } from 'ngx-tour-md-menu';
import { demandPortfolioListTour } from '../../toures/tour-definitions';

@Component({
  selector: 'invest-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})

export class PortfoliosComponent implements OnInit {

  @Input()
  selectedPortfolioType;

  portfolioTypes = [
    {value: 'private-1', viewValue: 'Private'},
    {value: 'public-2', viewValue: 'Public'},
    {value: 'all-0', viewValue: 'All'}
  ];

  privatePortfolioList$ = this.ngRedux.select(state => state.portfolioList);
  privatePortfolioList: PortfolioDetails[] = [];
  publicPortfolioList: PortfolioDetails[] = [];

  portfolioList: PortfolioDetails[] = [];
  isModelFetched = false;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private portfolioService: PortfolioService,
    private tourService: TourService
  ) {

  }

  ngOnInit() {
    if (this.selectedPortfolioType == null) {
      this.selectedPortfolioType = 'private-1';
    }

    this.privatePortfolioList$.subscribe(value => {
      this.privatePortfolioList = cloneDeep(value);
      this.portfolioList = cloneDeep(value);
    });
  }

  onFilterSelectionChange() {
    switch (this.selectedPortfolioType) {
      case 'all-0':
        this.portfolioList = cloneDeep(this.privatePortfolioList);
        this.fetchModelPortfolios(() => {
          this.publicPortfolioList.forEach((portfolio: PortfolioDetails) => {
            this.portfolioList.push(portfolio);
          });
        });
        break;
      case 'private-1':
        this.portfolioList = cloneDeep(this.privatePortfolioList);
        break;
      case 'public-2':
        this.fetchModelPortfolios(() => {
          this.portfolioList = cloneDeep(this.publicPortfolioList);
        });
        break;
      default:
    }
  }

  fetchModelPortfolios(callback: Function) {
    if (!this.isModelFetched) {
      this.portfolioService.getPortfolios(TypeOfPortfolio.model).then((publicPortfolioList: PortfolioDetails[]) => {
        this.publicPortfolioList = cloneDeep(publicPortfolioList);
        this.isModelFetched = true;
        callback();
      });
    } else {
      callback();
    }
  }

  startTourClick() {
    this.tourService.initialize(demandPortfolioListTour);
    this.tourService.start();
  }

}

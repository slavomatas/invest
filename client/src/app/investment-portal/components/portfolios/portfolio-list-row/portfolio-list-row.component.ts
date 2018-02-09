
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { colorScheme } from '../../../constants/constants';
import { PortfolioDetails } from '../../../types/types';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';


@Component({
  selector: 'invest-portfolio-list-row',
  templateUrl: './portfolio-list-row.component.html',
  styleUrls: ['./portfolio-list-row.component.scss']
})
export class PortfolioListRowComponent implements OnInit, OnChanges {

  @Input() descriptionLimit: Number;
  @Input() portfolioData: PortfolioDetails;

  chartData: {name: string, value: number}[] = [];

  colorScheme = {
    domain: colorScheme
  };

  limit: Number;
  descMoreShown: Boolean = false;

  constructor(
    private actions: PortfolioActions,
    private portfolioService: PortfolioService
  ) {


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['portfolioData']){
      this.chartData = [];
      this.portfolioData.positions.forEach((position) => {
        this.chartData.push({
          name: position.symbol,
          value: position.value
        });
      });
      this.portfolioData.marketValue = parseFloat(this.portfolioData.marketValue.toFixed(2));
      this.portfolioData.cash = parseFloat(this.portfolioData.cash.toFixed(4));
      this.portfolioData.lastChangeAbs = parseFloat(this.portfolioData.lastChangeAbs.toFixed(4));
      this.portfolioData.lastChangePct = parseFloat(this.portfolioData.lastChangePct.toFixed(4));
    }
  }

  ngOnInit() {
    console.log(this.portfolioData);
    this.limit = this.descriptionLimit;
  }

  managePortfolioUpdateOperation(portfolio: PortfolioDetails) {
    console.log('managePortfolioUpdateOperation');
  }

  managePortfolioCloneOperation(portfolio: PortfolioDetails) {
    console.log('managePortfolioCloneOperation');
  }

  managePortfolioRemoveOperation(portfolio: PortfolioDetails) {
    const putPortfolio: PortfolioDetails = portfolio;

    putPortfolio.closed = true;

    this.portfolioService.closePortfolio(putPortfolio).then((data: PortfolioDetails) => {
      if (data != null) {
        this.actions.putPortfolio(data);
      }
    });
  }

  descShowLess(){
    this.limit = this.descriptionLimit;
    this.descMoreShown = false;
  }

  descShowMore(){
    this.limit = 2500;
    this.descMoreShown = true;
  }

}

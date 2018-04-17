
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { colorScheme, greyScheme } from '../../../constants/constants';
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
  @Input() showGuide: boolean;

  chartData: {name: string, value: number}[] = [];

  colorScheme = {
    domain: colorScheme
  };

  limit: Number;

  constructor(
    private actions: PortfolioActions,
    private portfolioService: PortfolioService
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['portfolioData']){
      this.chartData = [];
      if (this.portfolioData.positions != null) {
        this.portfolioData.positions.forEach((position) => {
          this.chartData.push({
            name: position.symbol,
            value: position.value
          });
        });
      }
      this.portfolioData.marketValue = parseFloat(this.portfolioData.marketValue.toFixed(2));
      this.portfolioData.lastChangeAbs = parseFloat(this.portfolioData.lastChangeAbs.toFixed(4));
      this.portfolioData.lastChangePct = parseFloat(this.portfolioData.lastChangePct.toFixed(4));
    }
  }

  ngOnInit() {
    this.limit = this.descriptionLimit;
    if (this.portfolioData.closed){
      this.colorScheme.domain = greyScheme;
    } else {
      this.colorScheme.domain = colorScheme;
    }
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

    this.portfolioService.closePortfolio(putPortfolio).then(() => {
        this.actions.updatePortfolio(putPortfolio);
    });
  }

  descShowLess(){
    // console.log(this.limit + ' => ' + this.descriptionLimit);
    this.limit = this.descriptionLimit;
  }

  descShowMore(){
    // console.log(this.limit + ' => ' + 9999);
    this.limit = 9999;
  }

  formatSmallNumber(input: number){
    return input >= 0.0001 ? String(input) : '0.000';
  }

}

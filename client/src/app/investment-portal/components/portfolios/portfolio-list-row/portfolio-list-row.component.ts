import {Component, OnInit, Input, SimpleChange} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { colorScheme } from '../../../constants/constants';
import { PortfolioDetails } from "../../../types/types";

@Component({
  selector: 'invest-portfolio-list-row',
  templateUrl: './portfolio-list-row.component.html',
  styleUrls: ['./portfolio-list-row.component.scss']
})
export class PortfolioListRowComponent implements OnInit {

  @Input() descriptionLimit: Number;
  @Input() portfolioData: PortfolioDetails;

  chartData: {name: string, value: number}[] = [];

  colorScheme = {
    domain: colorScheme
  };

  limit: Number;
  descMoreShown: Boolean = false;

  constructor() {

  }

  ngOnChanges(changes: SimpleChange) {
    if (changes['portfolioData']){
      this.chartData = [];
      this.portfolioData.positions.forEach((position) => {
        this.chartData.push({
          name: position.symbol,
          value: position.value
        });
      })
    }
  }

  ngOnInit() {
    console.log(this.portfolioData);
    this.limit = this.descriptionLimit;
  }

  managePortfolioUpdateOperation(portfolioId: String) {
    console.log("managePortfolioUpdateOperation");
  }

  managePortfolioCloneOperation(portfolioId: String) {
    console.log("managePortfolioCloneOperation");
  }

  managePortfolioRemoveOperation(portfolioId: String) {
    console.log("managePortfolioRemoveOperation");
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

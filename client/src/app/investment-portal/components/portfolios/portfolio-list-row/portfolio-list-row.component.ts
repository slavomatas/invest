import {Component, OnInit, Input} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { colorScheme } from '../../../constants/constants';

@Component({
  selector: 'invest-portfolio-list-row',
  templateUrl: './portfolio-list-row.component.html',
  styleUrls: ['./portfolio-list-row.component.scss']
})
export class PortfolioListRowComponent implements OnInit {

  @Input() descriptionLimit: Number;

  colorScheme = {
    domain: colorScheme
  };

  portfolio: Object = {
    id: "id",
    name: "Portfolio001 Name",
    marketValue: "6.6K",
    cash: 0,
    lastChange: "54.412",
    lastChangePct: "7.21"
  };

  portfolioPg: Object = {
    strategy: "strategy",
    useAs: "useAs",
    description: "description"
  };

  limit: Number;
  descMoreShown: Boolean = false;

  constructor() {

  }

  ngOnInit() {
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

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

}

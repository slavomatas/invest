import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { PortfolioDetails} from '../../../types/types';
import { getDisplayedPortfolios } from '../../../utils/portfolio-utils';

@Component({
  selector: 'invest-dashboard-portfolio-list',
  templateUrl: './dashboard-portfolio-list.component.html',
  styleUrls: ['./dashboard-portfolio-list.component.scss']
})
export class DashboardPortfolioListComponent implements OnChanges {
  @Input() dashboardPortfolioList: PortfolioDetails[];

  nonClosedPortfolios: PortfolioDetails[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dashboardPortfolioList']) {
        this.nonClosedPortfolios = getDisplayedPortfolios(this.dashboardPortfolioList);
    }
  }

}

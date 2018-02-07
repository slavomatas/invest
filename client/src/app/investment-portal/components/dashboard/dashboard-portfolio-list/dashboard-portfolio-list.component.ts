import { Component, Input, SimpleChanges } from '@angular/core';
import { PortfolioDetails} from '../../../types/types';

@Component({
  selector: 'invest-dashboard-portfolio-list',
  templateUrl: './dashboard-portfolio-list.component.html',
  styleUrls: ['./dashboard-portfolio-list.component.scss']
})
export class DashboardPortfolioListComponent {
  @Input() dashboardPortfolioList: PortfolioDetails[];

  constructor() {
  }

}

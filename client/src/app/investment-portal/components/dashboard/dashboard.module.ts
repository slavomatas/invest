import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MockPortfolioService, PortfolioService } from '../../services/portfolio/portfolio.service';
import { SharedVariableService } from '../../services/shared-variable-service/shared-variable.service';
import { DashboardComponent } from './dashboard.component';
import { FuseWidgetComponent } from '../../../core/components/widget/widget.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { LineChartReturnsComponent } from '../line-chart-returns/line-chart-returns.component';
import { LineChartLegendComponent} from '../line-chart-legend/line-chart-legend.component';
import { CumulativeChartComponent } from './cumulative-chart/cumulative-chart.component';
import { DashboardPortfolioListComponent } from './dashboard-portfolio-list/dashboard-portfolio-list.component';
import { PortfolioOverviewComponent } from '../portfolio-overview/portfolio-overview.component';
import { HorizontalBarChartComponent } from '../horizontal-bar-chart/horizontal-bar-chart.component';


const routes = [
  {
    path     : 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    FuseWidgetComponent,
    LineChartComponent,
    LineChartReturnsComponent,
    LineChartLegendComponent,
    CumulativeChartComponent,
    DashboardPortfolioListComponent,
    PortfolioOverviewComponent,
    HorizontalBarChartComponent
  ],
  imports     : [
    SharedModule,
    RouterModule.forChild(routes),
    NgxChartsModule
  ],
  exports     : [
    DashboardComponent
  ],
  providers   : [
    PortfolioService,
    SharedVariableService,
    MockPortfolioService,
  ]
})

export class DashboardModule
{
}

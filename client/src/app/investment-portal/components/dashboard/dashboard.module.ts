import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FuseWidgetComponent } from '../../../core/components/widget/widget.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartReturnsComponent } from '../line-chart-returns/line-chart-returns.component';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

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
    LineChartReturnsComponent
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
    PortfolioService
  ]
})

export class DashboardModule
{
}

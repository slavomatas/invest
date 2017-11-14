import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { DashboardComponent } from './dashboard.component';
import { FuseWidgetComponent } from '../../../core/components/widget/widget.component';
import {LineChartComponent} from '../../our-components/line-chart/line-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { DashboardSummaryService } from '../../../invest-services/dashboard-summary/dashboard-summary.service';

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
        LineChartComponent
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
      DashboardSummaryService
    ]
})

export class DashboardModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { DashboardComponent } from './dashboard.component';
import { FuseWidgetComponent } from '../../../core/components/widget/widget.component';

const routes = [
    {
        path     : 'dashboard',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        FuseWidgetComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        DashboardComponent
    ]
})

export class DashboardModule
{
}

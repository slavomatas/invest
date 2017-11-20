import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { InvestmentPortalComponent } from './investment-portal.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { PortfoliosModule } from './components/portfolios/portfolios.module';
import {FailedActivationModule} from "./components/registration/activation-msg/failed/failed-activation.module";
import {SuccessfulActivationModule} from "./components/registration/activation-msg/successful/successful-activation.module";

const routes = [
  {
    path     : 'investment-portal',
    redirectTo: 'dashboard',
    component: InvestmentPortalComponent
  }
];

@NgModule({
  declarations: [
    InvestmentPortalComponent
  ],
  imports     : [
    SharedModule,
    RouterModule,
    DashboardModule,
    PortfoliosModule,
    FailedActivationModule,
    SuccessfulActivationModule
  ],
  exports     : [
    InvestmentPortalComponent
  ]
})

export class InvestmentPortalModule
{
}

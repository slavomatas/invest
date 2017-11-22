import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { InvestmentPortalComponent } from './investment-portal.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { PortfoliosModule } from './components/portfolios/portfolios.module';
import {ActivationMsgModule} from './components/authentication/registration/activation-msg/activation-msg.module';
import {RegistrationFormModule} from './components/authentication/registration/registration-form/registration-form.module';
import {LoginModule} from './components/authentication/login/login.module';

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
    ActivationMsgModule,
    RegistrationFormModule,
    LoginModule
  ],
  exports     : [
    InvestmentPortalComponent
  ]
})

export class InvestmentPortalModule
{
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/modules/shared.module';
import { InvestmentPortalComponent } from './investment-portal.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { PortfoliosModule } from './components/portfolios/portfolios.module';
import { ActivationMsgModule } from './components/authentication/registration/activation-msg/activation-msg.module';
import { RegistrationFormModule } from './components/authentication/registration/registration-form/registration-form.module';
import { rootReducer, INITIAL_STATE, AppState } from './store';
import { applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { StoreModule } from './store/store-module';
import { PortfolioActions } from './store/actions/portfolio-actions';
import { LineChartLegendComponent } from './components/line-chart-legend/line-chart-legend.component';

const routes = [
  {
    path: 'investment-portal',
    redirectTo: 'dashboard',
    component: InvestmentPortalComponent
  }
];

@NgModule({
  declarations: [
    InvestmentPortalComponent,
    LineChartLegendComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    DashboardModule,
    PortfoliosModule,
    ActivationMsgModule,
    RegistrationFormModule,
    StoreModule
  ],
  exports: [
    InvestmentPortalComponent
  ]
})

export class InvestmentPortalModule {
}

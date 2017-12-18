import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/modules/shared.module';
import { InvestmentPortalComponent } from './investment-portal.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { PortfoliosModule } from './components/portfolios/portfolios.module';
import { rootReducer, INITIAL_STATE, AppState } from './store';
import { applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { StoreModule } from './store/store-module';
import { PortfolioActions } from './store/actions/portfolio-actions';
import {LoginModule} from './components/authentication/login/login.module';
import {RegistrationFormModule} from './components/authentication/registration/registration-form/registration-form.module';
import { AuthRootComponent } from './components/authentication/auth-root/auth-root.component';
import { ActivationMsgModule } from './components/authentication/registration/activation-msg/activation-msg.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthHttpInterceptor} from './services/auth-http-interceptor';


const routes = [
  {
    path: 'investment-portal',
    redirectTo: 'dashboard',
    component: InvestmentPortalComponent
  }
];

@NgModule({
  declarations: [
    InvestmentPortalComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    DashboardModule,
    PortfoliosModule,
    LoginModule,
    RegistrationFormModule,
    StoreModule,
    ActivationMsgModule
  ],
  exports: [
    InvestmentPortalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ]
})

export class InvestmentPortalModule {
}

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
import { AuthComponent } from './components/auth/auth.component';
import { AuthService, MockAuthService } from './services/auth/auth.service';
import { IAuthService } from './services/auth/i-auth-service';


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
    AuthComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    DashboardModule,
    PortfoliosModule,
    LoginModule,
    RegistrationFormModule,
    StoreModule
  ],
  exports: [
    InvestmentPortalComponent
  ],
  providers: [
    {
      provide: MockAuthService,
      useFactory: () => new MockAuthService
    }
  ]
})

export class InvestmentPortalModule {
}

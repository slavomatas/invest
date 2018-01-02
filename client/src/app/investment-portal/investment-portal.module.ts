import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/modules/shared.module';
import { InvestmentPortalComponent } from './investment-portal.component';
import { rootReducer, INITIAL_STATE, AppState } from './store';
import { applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { StoreModule } from './store/store-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './services/authentication/auth-http-interceptor';
import { AuthGuard } from './services/authentication/auth.guard';
import { LoginComponent } from './components/authentication/login/login.component';
import { PortfoliosComponent } from './components/portfolios/portfolios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationFormComponent } from './components/authentication/registration/registration-form/registration-form.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { FuseWidgetModule } from '../core/components/widget/widget.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ActivationMsgComponent } from './components/authentication/registration/activation-msg/activation-msg.component';
import { PortfolioService } from './services/portfolio/portfolio.service';
import { SharedVariableService } from './services/shared-variable-service/shared-variable.service';
import { LineChartReturnsComponent } from './components/line-chart-returns/line-chart-returns.component';
import { LineChartLegendComponent} from './components/line-chart-legend/line-chart-legend.component';
import { CumulativeChartComponent } from './components/dashboard/cumulative-chart/cumulative-chart.component';
import { DashboardPortfolioListComponent } from './components/dashboard/dashboard-portfolio-list/dashboard-portfolio-list.component';
import { PortfolioOverviewComponent } from './components/portfolio-overview/portfolio-overview.component';
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'auth/register/confirm/:token', component: ActivationMsgComponent },
  { path: 'portfolios', component: PortfoliosComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    InvestmentPortalComponent,
    LoginComponent,
    RegistrationFormComponent,
    ActivationMsgComponent,
    PortfoliosComponent,
    DashboardComponent,
    LineChartComponent,
    DashboardComponent,
    LineChartComponent,
    LineChartReturnsComponent,
    LineChartLegendComponent,
    CumulativeChartComponent,
    DashboardPortfolioListComponent,
    PortfolioOverviewComponent,
    HorizontalBarChartComponent

  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    StoreModule,
    FuseWidgetModule,
    NgxChartsModule
  ],
  exports: [
    InvestmentPortalComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    PortfolioService,
    SharedVariableService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ]
})

export class InvestmentPortalModule {
}

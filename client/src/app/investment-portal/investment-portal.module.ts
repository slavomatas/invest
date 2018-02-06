import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/modules/shared.module';
import { InvestmentPortalComponent } from './investment-portal.component';
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
import { FuseWidgetModule } from '../core/components/widget/widget.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ActivationMsgComponent } from './components/authentication/registration/activation-msg/activation-msg.component';
import { PortfolioService } from './services/portfolio/portfolio.service';
import { CumulativeChartComponent } from './components/dashboard/cumulative-chart/cumulative-chart.component';
import { DashboardPortfolioListComponent } from './components/dashboard/dashboard-portfolio-list/dashboard-portfolio-list.component';
import { LineChartComponent } from './components/dashboard/cumulative-chart/line-chart/line-chart.component';
import { LineChartReturnsComponent } from './components/dashboard/cumulative-chart/line-chart-returns/line-chart-returns.component';
import { LineChartLegendComponent } from './components/dashboard/cumulative-chart/line-chart-legend/line-chart-legend.component';
import { PortfolioOverviewComponent } from './components/dashboard/dashboard-portfolio-list/portfolio-overview/portfolio-overview.component';
import { HorizontalBarChartComponent } from './components/dashboard/dashboard-portfolio-list/horizontal-bar-chart/horizontal-bar-chart.component';


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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ]
})

export class InvestmentPortalModule {
}

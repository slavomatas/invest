import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { InvestmentPortalComponent } from './investment-portal.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { PortfoliosModule } from './components/portfolios/portfolios.module';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { InvestmentActions } from './investment-actions';
import { rootReducer, INITIAL_STATE, AppState } from './store';

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
    NgReduxModule
  ],
  exports: [
    InvestmentPortalComponent
  ],
  providers: [
    InvestmentActions
  ]
})

export class InvestmentPortalModule {
  constructor(ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension) {

    // dev tools
    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];

    // configure AppStore
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      storeEnhancers
    );
  }
}

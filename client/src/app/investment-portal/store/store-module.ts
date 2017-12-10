import { NgModule } from '@angular/core';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { AppState, rootReducer, INITIAL_STATE } from '../store';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { PortfolioEpics } from './epics/portfolio-epics';
import { PortfolioActions } from './actions/portfolio-actions';
import { AuthenticationActions } from './actions/authentication-actions';

@NgModule({
  imports: [
    NgReduxModule
  ],
  providers: [
    PortfolioEpics,
    PortfolioActions,
    AuthenticationActions
  ]
})
export class StoreModule {
  constructor(ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension,
    portfolioEpics: PortfolioEpics) {

    // dev tools
    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];

    // EXAMPLE:
    // This is how multiple Epic middlewares can be used. Currently no
    // Epic is being used in project
    const rootEpic = combineEpics(
      // portfolioEpics.getPortfoliosCumulativeDataEpic
    );

    const epicMiddleware = createEpicMiddleware(rootEpic);

    // configure AppStore
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [epicMiddleware],
      storeEnhancers
    );
  }
}

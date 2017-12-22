import { Action } from 'redux';
import { User } from './types/types';
import { ChartModelPortfolio } from './types/dashboard-types';
import { Token } from './types/authentication-types';
import { PortfolioActions } from './store/actions/portfolio-actions';
import {AuthenticationActions} from './store/actions/authentication-actions';

export interface AppState {
    user: User,
    token: Token,
    chartPortfolios: ChartModelPortfolio[];
    isGettingPortfoliosCumulativeData: boolean;
    cumulativeFetchError: string | undefined;
}

export const INITIAL_STATE: AppState = {
    chartPortfolios: [],
    isGettingPortfoliosCumulativeData: false,
    cumulativeFetchError: undefined,
    user: undefined,
    token: undefined
};

export function rootReducer(lastState: AppState, action: any): AppState {
    switch (action.type) {
        case PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS:
            return <AppState>{
              ...lastState,
              isGettingPortfoliosCumulativeData: false,
              chartPortfolios: action.payload,
              cumulativeFetchError: undefined
            };
        case PortfolioActions.FGET_CUMULATIVE_FULFILLED_FAILURE:
            return <AppState>{
              ...lastState,
              isGettingPortfoliosCumulativeData: false,
              cumulativeFetchError: action.payload
            };
        case PortfolioActions.GET_PORTFOLIOS_CUMULATIVE_DATA:
            return <AppState>{
              ...lastState,
              isGettingPortfoliosCumulativeData: true,
              cumulativeFetchError: undefined
            };
        case AuthenticationActions.GET_USER_SUCCESS:
            return <AppState> {
              ...lastState,
              user: action.payload
            };
        case AuthenticationActions.FGET_USER_FAILURE:
            return <AppState> {
              ...lastState,
              user: undefined
            };
        case AuthenticationActions.GET_ACCESS_TOKEN_SUCCESS:
            return <AppState> {
              ...lastState,
              token: action.payload
            };
        case AuthenticationActions.FGET_ACCESS_TOKEN_FAILURE:
            return <AppState> {
              ...lastState,
              token: undefined
            };
        case AuthenticationActions.LOG_OUT:
          return INITIAL_STATE;
    }

    // if no no supported action was caught, return last known state
    return lastState;
}

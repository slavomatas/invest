import { Action } from 'redux';
import { User, PortfolioDetails, PortfolioTimeSeries } from '../types/types';
import { Token } from '../types/authentication-types';
import { PortfolioActions } from './actions/portfolio-actions';
import { AuthenticationActions } from './actions/authentication-actions';


export interface AppState {
    user: User;
    token: Token;
    portfolioTimeSeries: PortfolioTimeSeries[];
    portfolioList: PortfolioDetails[];
    modelPortfolioList: PortfolioDetails[];
    displayedPortfolios: PortfolioDetails[];
    isGettingPortfoliosCumulativeData: boolean;
    cumulativeFetchError: string | undefined;
    portfoliosDetailsFetchError: string | undefined;

    cumulativeChartSelectedPeriod: string;
    currencySymbol: string;
}

export const INITIAL_STATE: AppState = {
    portfolioTimeSeries: [],
    portfolioList: [],
    modelPortfolioList: [],
    displayedPortfolios: [],
    isGettingPortfoliosCumulativeData: false,
    cumulativeFetchError: undefined,
    portfoliosDetailsFetchError: undefined,

    // CumulativeChartControls
    cumulativeChartSelectedPeriod: 'ALL',
    currencySymbol: '$',
    user: undefined,
    token: undefined
};

export function rootReducer(lastState: AppState, action: any): AppState {
    switch (action.type) {
        case PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS:
            return <AppState>{
              ...lastState,
              isGettingPortfoliosCumulativeData: false,
              portfolioTimeSeries: action.payload,
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
        case PortfolioActions.GET_PORTFOLIOS:
          return {
            ...lastState,
            portfolioList: action.payload,
            portfoliosDetailsFetchError: undefined
          };
        case PortfolioActions.FGET_PORTFOLIOS:
          return {
            ...lastState,
            portfoliosDetailsFetchError: action.payload
          };
        case PortfolioActions.GET_MODEL_PORTFOLIOS:
          return {
            ...lastState,
            modelPortfolioList: action.payload,
            portfoliosDetailsFetchError: undefined
          };
        case PortfolioActions.FGET_MODEL_PORTFOLIOS:
          return {
            ...lastState,
            portfoliosDetailsFetchError: action.payload
          };

        case PortfolioActions.SET_CUMULATIVE_CHART_PERIOD:
            return {
                ...lastState,
                cumulativeChartSelectedPeriod: action.payload
            };
        case PortfolioActions.SET_PORTFOLIO_CUMULATIVE_CHART_SELECTED:
          return {
            ...lastState,
            displayedPortfolios: action.payload,
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
        case PortfolioActions.UPDATE_FIRST_LOGIN_FLAG:
            const user = lastState.user;
            user.firstLogin = action.payload;
            return <AppState> {
              ...lastState,
              user: user
            };
        case AuthenticationActions.LOG_OUT:
          return INITIAL_STATE;
    }

    // if no no supported action was caught, return last known state
    return lastState;
}

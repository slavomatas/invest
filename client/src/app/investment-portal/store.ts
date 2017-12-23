import { Action } from 'redux';
import { Portfolio, PortfolioSummary, PortfolioDetails } from './types/types';
import { User } from './types/types';
import { ChartModelPortfolio } from './types/dashboard-types';
import { Token } from './types/authentication-types';
import { PortfolioActions } from './store/actions/portfolio-actions';
import { AuthenticationActions } from './store/actions/authentication-actions';

export interface AppState {
    user: User,
    token: Token,
    chartPortfolios: ChartModelPortfolio[];
    dashboardPortfolioList: PortfolioDetails[];
    isGettingPortfoliosCumulativeData: boolean;
    cumulativeFetchError: string | undefined;
    portfoliosDetailsFetchError: string | undefined;

    portfolioSummary: PortfolioSummary;
    cumulativeChartSelectedPeriod: string;
    currencySymbol: string;
}

export const INITIAL_STATE: AppState = {
    chartPortfolios: [],
    dashboardPortfolioList: [],
    isGettingPortfoliosCumulativeData: false,
    cumulativeFetchError: undefined,
    portfoliosDetailsFetchError: undefined,

    // CumulativeChartControls
    cumulativeChartSelectedPeriod: '3M',
    currencySymbol: '$',
    portfolioSummary: {
        marketValue: 0,
        periodMarketValue: 0,
        periodMarketValuePercentage: 0,
        percentage: 0
    },

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
        case PortfolioActions.GET_PORTFOLIOS_LIST_DETAILS:
          return {
            ...lastState,
            dashboardPortfolioList: action.payload,
            portfoliosDetailsFetchError: undefined
          };
        case PortfolioActions.FGET_PORTFOLIOS_LIST_DETAILS:
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
            chartPortfolios: action.payload,
          };

        case PortfolioActions.SET_PORTFOLIO_SUMMARY:
          return {
            ...lastState,
            portfolioSummary: action.payload,
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

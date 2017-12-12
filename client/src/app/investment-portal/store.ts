import { Action } from 'redux';
import {Portfolio, ChartModelPortfolio, PortfolioSummary, PortfolioDetails} from './types/types';
import { PortfolioActions } from './store/actions/portfolio-actions';

export interface AppState {
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
        periodReturn: 0,
        periodReturnPercentage: 0,
        percentage: 0
    },
};

export function rootReducer(lastState: AppState, action: any): AppState {
    switch (action.type) {
        case PortfolioActions.GET_CUMULATIVE_FULFILLED_SUCCESS:
            return {
                ...lastState,
                isGettingPortfoliosCumulativeData: false,
                chartPortfolios: action.payload,
                cumulativeFetchError: undefined
            };
        case PortfolioActions.FGET_CUMULATIVE_FULFILLED_FAILURE:
            return {
                ...lastState,
                isGettingPortfoliosCumulativeData: false,
                cumulativeFetchError: action.payload
            };
        case PortfolioActions.GET_PORTFOLIOS_CUMULATIVE_DATA:
            return {
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

    }

    // if no no supported action was caught, return last known state
    return lastState;
}

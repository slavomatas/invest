import { Action } from 'redux';
import  {Portfolio, ChartModelPortfolio, PortfolioSummary } from './types/types';
import { PortfolioActions } from './store/actions/portfolio-actions';

export interface AppState {
    chartPortfolios: ChartModelPortfolio[];
    isGettingPortfoliosCumulativeData: boolean;
    cumulativeFetchError: string | undefined;
    portfolioSummary: PortfolioSummary;
}

export const INITIAL_STATE: AppState = {
    chartPortfolios: [],
    isGettingPortfoliosCumulativeData: false,
    cumulativeFetchError: undefined,
    portfolioSummary: {
        selectedPeriod: '3M',
        currencySymbol: '$',
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
        case PortfolioActions.GET_PORTFOLIOS_SUMMARY_DATA:
            return {
                ...lastState,
                portfolioSummary: action.payload
            };
    }

    // if no no supported action was caught, return last known state
    return lastState;
}

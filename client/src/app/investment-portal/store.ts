import { Action } from 'redux';
import { Portfolio, ChartModelPortfolio } from './types/types';
import { PortfolioActions } from './store/actions/portfolio-actions';

export interface AppState {
    chartPortfolios: ChartModelPortfolio[];
    isGettingPortfoliosCumulativeData: boolean;
    cumulativeFetchError: string | undefined;
}

export const INITIAL_STATE: AppState = {
    chartPortfolios: [],
    isGettingPortfoliosCumulativeData: false,
    cumulativeFetchError: undefined
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
    }

    // if no no supported action was caught, return last known state
    return lastState;
}

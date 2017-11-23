import { Action } from 'redux';
import { InvestmentActions } from './investment-actions';
import { Portfolio } from './types/types';

export interface AppState {
    portfolios: Portfolio[];
    isFetchingPortfolios: boolean;
    fetchingPortfolioError: string | undefined;
}

export const INITIAL_STATE: AppState = {
    portfolios: [],
    isFetchingPortfolios: false,
    fetchingPortfolioError: undefined
};

export function rootReducer(lastState: AppState, action: any): AppState {
    switch (action.type) {
        case InvestmentActions.REQUEST_PORTFOLIOS:
            return {
                ...lastState,
                isFetchingPortfolios: true,
                fetchingPortfolioError: undefined,
                portfolios: []
            };
        case InvestmentActions.PORTFOLIOS_FETCH_SUCCESS:
            return {
                ...lastState,
                isFetchingPortfolios: false,
                portfolios: action.payload,
                fetchingPortfolioError: undefined
            };
        case InvestmentActions.PORTFOLIOS_FETCH_FAILURE:
            return {
                ...lastState,
                isFetchingPortfolios: false,
                fetchingPortfolioError: 'error while getting portfolios'
            };
    }

    // if no no supported action was caught, return last known state
    return lastState;
}

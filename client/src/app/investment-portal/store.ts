import { Action } from 'redux';
import { Portfolio } from './types/types';
import { InvestmentActions } from './store/actions/investment-actions';

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
        case InvestmentActions.FETCH_PORTFOLIOS:
            return {
                ...lastState,
                isFetchingPortfolios: true,
                fetchingPortfolioError: undefined,
                portfolios: []
            };
        case InvestmentActions.FETCH_PORTFOLIOS_FULFILLED_SUCCESS:
            return {
                ...lastState,
                isFetchingPortfolios: false,
                portfolios: action.payload,
                fetchingPortfolioError: undefined
            };
        case InvestmentActions.FETCH_PORTFOLIOS_FULFILLED_FAILURE:
            return {
                ...lastState,
                isFetchingPortfolios: false,
                fetchingPortfolioError: 'error while getting portfolios'
            };
    }

    // if no no supported action was caught, return last known state
    return lastState;
}

import { Action } from 'redux';
import { InvestmentActions } from './investment-actions';

export interface AppState {
  count: number;
}

export const INITIAL_STATE: AppState = {
  count: 0,
};

export function rootReducer(lastState: AppState, action: Action): AppState {
  switch(action.type) {
    case InvestmentActions.INCREMENT: return { count: lastState.count + 1 };
    case InvestmentActions.DECREMENT: return { count: lastState.count - 1 };
  }

  // if no no supported action was caught, return last known state
  return lastState;
}
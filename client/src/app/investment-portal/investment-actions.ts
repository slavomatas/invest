import { Injectable } from '@angular/core';
import { Action } from 'redux';

@Injectable()
export class InvestmentActions {
  static INCREMENT = 'INCREMENT';
  static DECREMENT = 'DECREMENT';

  increment(): Action {
    return { type: InvestmentActions.INCREMENT };
  }

  decrement(): Action {
    return { type: InvestmentActions.DECREMENT };
  }
}
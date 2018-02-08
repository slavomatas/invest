export interface Portfolio {
  name: string;
  id: number;
  description: string;
}

export interface CumulativeMeasurement {
  name: string;
  value: string;
}

export interface User {
  name: string;
  surname: string;
  username: string;
  email: string;
  roles: [{
    roleName: string,
    description: string
  }];
}

export interface PortfolioDetails {
  id: number;
  name: string;
  description: string;
  marketValue: number;
  oldMarketValues: TypeOfOldMarketValue;   // oldMarketValue - cumulative chart market value at the beginning of the preiod
  lastChangeAbs: number;
  lastChangePct: number;
  returns: TypeOfReturns;
  cash: number;
  isClosed: boolean;
  isDisplayed: boolean;
  positions:
    {
      symbol: string;
      value: number;
    }[];
  series:                 // series - time series of the portfolio
    {
      name: string,
      value: number
    }[];  
}

export interface PortfolioTimeSeries {
  id: number;

  series:
    {
      name: string,
      value: number
    }[];
}

export interface TypeOfReturns {
  daily?: number;
  weekly?: number;
  monthly?: number;
  quarterly?: number;
  yearly?: number;
  cumulative?: number;
  all?: number;
}

export interface TypeOfOldMarketValue {
  oneM?: number;
  threeM?: number;
  sixM?: number;
  nineM?: number;
  twelveM?: number;
  all?: number;
}

export enum TypeOfPortfolioReturn {
  daily = 'PORTFOLIO_DAILY_RETURNS',
  weekly = 'PORTFOLIO_WEEKLY_RETURNS',
  monthly = 'PORTFOLIO_MONTHLY_RETURNS',
  quaterly = 'PORTFOLIO_QUARTERLY_RETURNS',
  yearly = 'PORTFOLIO_YEARLY_RETURNS',
  cumulative = 'PORTFOLIO_CUMULATIVE_RETURNS'
}

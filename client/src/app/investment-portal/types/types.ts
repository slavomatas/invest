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
  closed: boolean;
  isDisplayed: boolean;
  positions: PortfolioPosition[];
  series:                 // series - time series of the portfolio
    {
      name: string,
      value: number
    }[];
  model: boolean;
  color: string;
}

export interface PortfolioTimeSeries {
  id: number;
  series:
    {
      name: string,
      value: number
    }[];
}

export interface Trade {
  tradeId: number;
  price: number;
  amount: number;
  dateTime: string;
}

export enum TransactionTypes {
  BUY = 'Buy',
  SELL = 'Sell'
}

export interface PortfolioPosition {
  symbol: string;
  value: number;    // market value of position - used on dashboard in portfolio overview list
  name: string;
  quantity: number; // sum trades.amount
  price: number;
  currency: string;
  priceLast20Days: {
    name: string;
    value: number;
  }[];
  lastChange: number;
  trades: Trade[];
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

export enum TypeOfPortfolio {
  all = 'ALL',
  user = 'USER',
  model = 'MODEL'
}

export enum CookieNames {
  loginToken = 'login-token'
}

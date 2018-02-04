export interface Portfolio {
  name: string;
  id: number;
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
  }]
}

export interface PortfolioDetails {
  name: string;
  id: number;
  marketValue: number;
  oldMarketValue: number;
  returns: TypeOfReturns;
  positions:
    {
      symbol: string;
      value: number;
    }[];
}

export interface TypeOfReturns {
  daily?: number;
  weekly?: number;
  monthly?: number;
  quarterly?: number;
  yearly?: number;
  cumulative?: number;
}

export enum TypeOfPortfolioReturn {
  daily = 'PORTFOLIO_DAILY_RETURNS',
  weekly = 'PORTFOLIO_WEEKLY_RETURNS',
  monthly = 'PORTFOLIO_MONTHLY_RETURNS',
  quaterly = 'PORTFOLIO_QUARTERLY_RETURNS',
  yearly = 'PORTFOLIO_YEARLY_RETURNS',
  cumulative = 'PORTFOLIO_CUMULATIVE_RETURNS'
}

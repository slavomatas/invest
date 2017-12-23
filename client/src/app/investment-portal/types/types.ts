export interface Portfolio {
  name: string;
  id: string;
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
  id: string;
  marketValue: number;
  oldMarketValue: number;
  returns: TypeOfReturns;
  positions:
    {
      name: string;
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
  daily = 'PORTFOLIO_DAILY_RETURN',
  weekly = 'PORTFOLIO_WEEKLY_RETURN',
  monthly = 'PORTFOLIO_MONTHLY_RETURN',
  quaterly = 'PORTFOLIO_QUARTERLY_RETURN',
  yearly = 'PORTFOLIO_YEARLY_RETURN',
  cumulative = 'PORTFOLIO_CUMULATIVE_RETURN'
}

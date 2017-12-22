export interface Portfolio {
  name: string;
  id: string;
}

export interface CumulativeMeasurement {
  name: string;
  value: string;
}

export interface PortfolioReturn {
  name: string;
  value: string;
}

export interface ChartModelPortfolio {
  name: string;
  id: string;
  selected: boolean;
  series:
    {
      name: string,
      value: number
    }[];
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


export interface PortfolioSummary {
  marketValue: number;
  periodReturn: number;
  periodReturnPercentage: number;
  // determines if the period return percentage is positive or negative(less than 0)
  percentage: number;
}

export enum TypeOfPortfolioReturn {
  daily = 'PORTFOLIO_DAILY_RETURN',
  weekly = 'PORTFOLIO_WEEKLY_RETURN',
  monthly = 'PORTFOLIO_MONTHLY_RETURN',
  quaterly = 'PORTFOLIO_QUARTERLY_RETURN',
  yearly = 'PORTFOLIO_YEARLY_RETURN',
  cumulative = 'PORTFOLIO_CUMULATIVE_RETURN'
}

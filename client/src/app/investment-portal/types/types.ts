export interface Portfolio {
  name: string;
  id: string;
}

export interface CumulativeMeasurement {
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

export interface PortfolioSummary {
  selectedPeriod: string,
  currencySymbol: string,
  marketValue: number,
  periodReturn: number,
  periodReturnPercentage: number,
  // determines if the period return percentage is positive or negative(less than 0)
  percentage: number
}

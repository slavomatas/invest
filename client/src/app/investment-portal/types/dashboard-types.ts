export interface PortfolioReturn {
  name: string;
  value: string;
}

export interface PortfolioSummary {
  marketValue: number;
  periodMarketValue: number;
  periodMarketValuePercentage: number;
}

export interface ChartModelPortfolio {
  name: string;
  id: string;
  selected: boolean;
  marketValue: number;
  oldMarketValue: number;
  series:
    {
      name: string,
      value: number
    }[];
}

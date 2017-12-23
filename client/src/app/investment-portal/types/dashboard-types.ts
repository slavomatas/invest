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

export interface CumulativeMeasurement {
  name: string;
  value: string;
}

export interface ChartModelPortfolio {
  name: string;
  series:
    {
      name: string,
      value: number
    }[];
}
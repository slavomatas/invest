export interface Portfolio {
  name: string;
  id: string;
}

export interface CumulativeMeasurement {
  name: string;
  value: string;
}

export interface RequestStatus {
  success: boolean;
}

export interface ChartModelPortfolio {
  name: string;
  series:
    {
      name: string,
      value: number
    }[];
}

export interface RequestStatus {
  success: boolean
}

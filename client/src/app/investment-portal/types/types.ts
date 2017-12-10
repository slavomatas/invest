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
  msg: string;
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

export interface User {
  name: string;
  username: string;
  email: string;
  role: {
    name: string,
    description: string
  }
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  jti: string
}

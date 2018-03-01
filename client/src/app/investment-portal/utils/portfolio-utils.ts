import { TypeOfOldMarketValue, PortfolioDetails, Portfolio, Trade, PortfolioPosition } from '../types/types';

export function getOldMarketValue(periodName: string, oldMarketValues: TypeOfOldMarketValue) {
    switch (periodName) {
        case '1M': {
            return oldMarketValues.oneM;
        }
        case '3M': {
            return oldMarketValues.threeM;
        }
        case '6M': {
            return oldMarketValues.sixM;
        }
        case '9M': {
            return oldMarketValues.nineM;
        }
        case '12M': {
            return oldMarketValues.twelveM;
        }
        default: {  // default set to 3 months period
            return oldMarketValues.threeM;
        }
    }
}

export function setOldMarketValue(periodName: string, oldMarketValues: TypeOfOldMarketValue, value: number) {
    switch (periodName) {
        case '1M': {
            oldMarketValues.oneM = value;
            break;
        }
        case '3M': {
            oldMarketValues.threeM = value;
            break;
        }
        case '6M': {
            oldMarketValues.sixM = value;
            break;
        }
        case '9M': {
            oldMarketValues.nineM = value;
            break;
        }
        case '12M': {
            oldMarketValues.twelveM = value;
            break;
        }
        default: {  // default set to 3 months period
            oldMarketValues.threeM = value;
            break;
        }
    }
}


export function getDateFrom(dateTo: Date, stringPeriod: string): Date {
    const dateFrom = new Date();
    let monthCount = 0;
    switch (stringPeriod) {
        case '1M': {
            monthCount = 1;
            break;
        }
        case '3M': {
            monthCount = 3;
            break;
        }
        case '6M': {
            monthCount = 6;
            break;
        }
        case '9M': {
            monthCount = 9;
            break;
        }
        case '12M': {
            monthCount = 12;
            break;
        }
        default: {  // default set to 3 months period
            monthCount = 3;
            break;
        }
    }
    dateFrom.setMonth(dateTo.getMonth() - monthCount);
    return dateFrom;
}

export function getDisplayedPortfolios(portfolios: PortfolioDetails[], getClosed: boolean = false) {
    return portfolios.filter(portfolio => portfolio.isDisplayed && portfolio.closed === getClosed);
    // return portfolios.filter(portfolio => portfolio.isDisplayed);

}

export function findPortfolioById(portfolios: PortfolioDetails[], portfolioId: Number): PortfolioDetails {
    return portfolios.filter(portfolio => portfolio.id === portfolioId)[0];
}

export function updateTradeInPortfolio(portfolio: PortfolioDetails, symbol: string, trade: Trade) {
  if (!portfolio.positions) {
    portfolio.positions = [];
  }

  let positionExist = false;
  portfolio.positions.forEach((position) => {
    if (position.symbol === symbol) {

      if (!position.trades) {
        position.trades = [];
      }

      const newTrades: Trade[] = [];
      let isUpdate = false;

      position.trades.forEach((posTrade: Trade) => {
        if (posTrade.tradeId === trade.tradeId) {
          newTrades.push(trade);
          isUpdate = true;
        } else {
          newTrades.push(posTrade);
        }
      });

      if (!isUpdate) {
        newTrades.push(trade);
      }
      position.trades = newTrades;
      positionExist = true;
    }
  });

  if (!positionExist) {
    this.portfolio.positions.push(<PortfolioPosition>{
      symbol: symbol,
      trades: [trade]
    });
  }
}

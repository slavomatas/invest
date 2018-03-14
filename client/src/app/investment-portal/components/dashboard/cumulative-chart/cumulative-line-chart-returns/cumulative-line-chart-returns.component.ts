import { Component, OnInit, NgModule} from '@angular/core';
import { cloneDeep } from 'lodash';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { PortfolioSummary, PortfolioReturn } from '../../../../types/dashboard-types';
import { PortfolioService } from '../../../../services/portfolio/portfolio.service';
import { AppState } from '../../../../store/store';
import { PortfolioActions } from '../../../../store/actions/portfolio-actions';
import { PortfolioDetails, TypeOfOldMarketValue } from '../../../../types/types';
import { getOldMarketValue, getDateFrom, setOldMarketValue, getDisplayedPortfolios } from '../../../../utils/portfolio-utils';

@Component({
  selector: 'invest-cumulative-line-chart-returns',
  templateUrl: 'cumulative-line-chart-returns.component.html',
  styleUrls: ['cumulative-line-chart-returns.component.scss']
})
export class LineChartReturnsComponent implements OnInit {

  // selectedPortfolioTimeSeries$ =  this.ngRedux.select(state => state.portfolioTimeSeries.filter(portfolio => portfolio.selected)) ;
  portfolioList$ =  this.ngRedux.select(state => state.portfolioList) ;
  cumulativeChartSelectedPeriod$ = this.ngRedux.select(state => state.cumulativeChartSelectedPeriod);
  currencySymbol$ = this.ngRedux.select(state => state.currencySymbol);

  portfolioList: PortfolioDetails[] = [];

  chartData: PortfolioDetails[] = [];
  currencySymbol: string;
  selectedPeriod: string;
  portfolioSummaryObject: PortfolioSummary = {
    marketValue: 0,
    periodMarketValue: 0,
    periodMarketValuePercentage: 0
  };

  private  definedPeriods: Map<string, string> = new Map([
    ['1M', 'last month'],
    ['3M', 'last 3 months'],
    ['6M', 'last 6 months'],
    ['9M', 'last 9 months'],
    ['12M', 'last 12 months'],
    ['ALL', 'all time']
  ]);

  constructor(
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>) {

    this.cumulativeChartSelectedPeriod$.subscribe((data: string) => {
      if (data != null) {
        this.selectedPeriod = data;
      }
    });

    this.portfolioList$.subscribe((data: PortfolioDetails[]) => {
      this.portfolioList = data;
      this.refreshReturns();

    });

    this.currencySymbol$.subscribe((data: string) => {
      if (data != null) {
        this.currencySymbol = data;
      }
    });
  }

  ngOnInit() {
  }

  private numberWithCommas(x) {
    x = (Math.round(x * 100) / 100).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  periodEvent(event) {
    const periodString = event.srcElement.innerText;

    let newPortfolioPromises: Promise<PortfolioDetails>[] = [];

    newPortfolioPromises = this.portfolioList.map(async (portfolio: PortfolioDetails) => {
      if (getOldMarketValue(periodString, portfolio.oldMarketValues) == null) {
        let dateTo;
        let dateFrom;
        if (periodString === 'ALL') {
          dateTo = null;
          dateFrom = null;
        } else {
          dateTo = new Date();
          dateFrom = getDateFrom(dateTo, periodString);
          console.log('My log1', dateTo, dateFrom);
          dateTo = cloneDeep(dateFrom);
          dateTo.setDate(dateTo.getDate() + 3); // want only the day at the start of the period, but BE cant process the same date so we take them the period of days, 
          // because of the fact we dont have weekends in the DB we have to make the period 3 days long so we'll receive at least 1 measurement for sure
          console.log('My log2', dateTo, dateFrom);
        }
          

        await this.portfolioService.getPortfolioMarketValues(portfolio.id, dateFrom, dateTo).toPromise()
          .then((returns: PortfolioReturn[]) => {
            const length = returns.length;
            let oldMarketValue;

            if (length > 0){
              oldMarketValue = Number.parseFloat(returns[0].value);
            } else {
              oldMarketValue = 0;
            }
            
            setOldMarketValue(periodString, portfolio.oldMarketValues, oldMarketValue);
          });
      } else {
        this.refreshReturns();
      }
      return portfolio;
    });

    Promise.all(newPortfolioPromises).then((newPortfolios) => {
    
      this.actions.setCumulativeChartPeriod(event.srcElement.innerText);
      this.actions.getPortfolios(true, newPortfolios);
    });

  }  

  private refreshReturns() {

    let totalMarketValue = 0;
    let totalOldMarketValue = 0;
    const displayedPortfolios = getDisplayedPortfolios(this.portfolioList);

    for (const portfolio of displayedPortfolios) {
      totalMarketValue += portfolio.marketValue;
      totalOldMarketValue += getOldMarketValue(this.selectedPeriod, portfolio.oldMarketValues);
    }

    this.portfolioSummaryObject.marketValue = this.numberWithCommas(totalMarketValue);
    this.portfolioSummaryObject.periodMarketValue = this.numberWithCommas(totalOldMarketValue);
    this.portfolioSummaryObject.periodMarketValuePercentage = (totalMarketValue === 0) ? 0 : ((totalMarketValue - totalOldMarketValue) / totalMarketValue);
  }

}

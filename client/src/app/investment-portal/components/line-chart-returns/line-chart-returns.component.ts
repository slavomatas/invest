import {Component, OnInit, NgModule} from '@angular/core';

@Component({
  selector: 'app-line-chart-returns',
  templateUrl: 'line-chart-returns.component.html',
  styleUrls: ['line-chart-returns.component.scss']
})
export class LineChartReturnsComponent implements OnInit {

  // Redux
  chartSummaryObject = {
    marketValue: '39584.2455',
    periodReturn: '4982.19',
    periodReturnPercentage: '12.86',
    percentage: 0
  }

  // Redux
  selectedPeriod = '1M';
  currencySymbol = '$';

  private  definedPeriods:Map<string, string> = new Map([
    ['1M', 'last month'],
    ['3M', 'last 3 months'],
    ['6M', 'last 6 months'],
    ['9M', 'last 9 months'],
    ['12M', 'last 12 months'],
    ['ALL', 'all time']
  ]);

  constructor() { }

  ngOnInit() {
    //TODO: call redux
    this.chartSummaryObject.marketValue = this.numberWithCommas(Number(this.chartSummaryObject.marketValue));
    this.chartSummaryObject.periodReturn = this.numberWithCommas(Number(this.chartSummaryObject.periodReturn));
    this.chartSummaryObject.periodReturnPercentage = this.numberWithCommas(Number(this.chartSummaryObject.periodReturnPercentage));
  }

  private numberWithCommas(x) {
    x = (Math.round(x * 100)/100).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  periodEvent(event) {
    this.selectedPeriod = event.srcElement.innerText;
  }
}

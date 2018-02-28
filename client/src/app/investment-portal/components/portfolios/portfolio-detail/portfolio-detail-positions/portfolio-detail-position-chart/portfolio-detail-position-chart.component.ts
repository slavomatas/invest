import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'invest-portfolio-detail-position-chart',
  templateUrl: './portfolio-detail-position-chart.component.html',
  styleUrls: ['./portfolio-detail-position-chart.component.scss']
})
export class PortfolioDetailPositionChartComponent implements OnInit, OnChanges {

  @Input() inputChartData: {name: string, value: number}[];
  chartData: {name: string, series: {name: string, value: number}[]}[];

  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#39a7db']
  };
  // line, area
  autoScale = true;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('What I got', this.inputChartData);
    this.chartData = [];
    this.chartData.push({name: '', series: this.inputChartData});
    this.chartData = cloneDeep(this.chartData);
  }

}

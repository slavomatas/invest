import { Component, OnInit } from '@angular/core';
import {multi} from './dummy-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  single: any[];
  multi: any[];

  // view: any[] = [900, 400];

  // options
  animations = true;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // line, area
  autoScale = true;

  constructor() {
    // Object.assign(this, {single, multi});
    this.multi = multi.map(group => {
      group.series = group.series.map(dataItem => {
        dataItem.name = new Date(dataItem.name).toDateString();
        return dataItem;
      });
      return group;
    });
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}

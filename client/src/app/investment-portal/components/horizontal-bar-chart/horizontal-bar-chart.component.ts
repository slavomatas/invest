import { Component, OnInit } from '@angular/core';
import { PortfolioActions } from "../../store/actions/portfolio-actions";
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../../store";

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: 'horizontal-bar-chart.component.html',
  styleUrls: ['horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {

  // Options of chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Gain/Loss %';
  showYAxisLabel = true;
  yAxisLabel = '';
  barPadding = 30;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>
  ) {

  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }

  single: any[] = [
    {
      "name": "LCC",
      "value": 7.121
    },
    {
      "name": "CXD",
      "value": 9.12
    },
    {
      "name": "DAA",
      "value": -15.2
    }
  ];

}

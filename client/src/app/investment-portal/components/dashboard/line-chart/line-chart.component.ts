import { Component, OnInit } from '@angular/core';
import { Portfolio, CumulativeMeasurement } from '../../../types/types';
import { cloneDeep } from 'lodash';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';

interface ChartModel {
  name: string;
  series:
    {
      name: string,
      value: number
    }[];
}

@Component({
  selector: 'fuse-app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {


  chartData: ChartModel[] = [];

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

  constructor(private portfolioService: PortfolioService) {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.loadChartData();
  }

  /**
   * Loads data from DashboardSummaryService into chart component
   */
  private loadChartData() {
    const tempChartData: ChartModel[] = [];

    this.portfolioService.getPortfolios().subscribe((portfolios: Portfolio[]) => {

      portfolios.map((portfolio: Portfolio) => {

        const portfolioChart: ChartModel = {
          name: portfolio.name,
          series: []
        };

        this.portfolioService.getCumulativeMeasurements(portfolio.id).subscribe((measurements: CumulativeMeasurement[]) => {

          measurements.map((measurement: CumulativeMeasurement) => {
            portfolioChart.series.push({
              name: measurement.name,
              value: Number.parseFloat(measurement.value)
            });
          });

          tempChartData.push(portfolioChart);
          this.chartData = cloneDeep(tempChartData);
        });

      });

    });
  }

}

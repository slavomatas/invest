import { Component, OnInit } from '@angular/core';
import { ClickableWidgetModel } from './clickable-widget/clickable-widget.component';

@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.scss']
})
export class CreatePortfolioComponent implements OnInit {

  widgets: ClickableWidgetModel[] = [
    {
      title: 'Create manual portfolio',
      icon: "add_circle",
      buttonClick: () => {
        this.createManualPortfolio();
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  private createManualPortfolio() {
    console.log("CREATING MANUAL PORTFOLIO");
  }

}

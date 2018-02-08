import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { Portfolio } from '../../../types/types';

@Component({
  selector: 'app-create-manual-portfolio-dialog',
  templateUrl: './create-manual-portfolio-dialog.component.html',
  styleUrls: ['./create-manual-portfolio-dialog.component.scss']
})
export class CreateManualPortfolioDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateManualPortfolioDialogComponent>,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    console.log("ON CLOSE");
  }

  onSubmit() {
    console.log("ON SUBMIT");
    const DEFAULT_PORTFOLIO_ID = 0;
    let portfolio: Portfolio = {
      id: DEFAULT_PORTFOLIO_ID,
      name: 'Created Portfolio 1',
      description: 'Created Portfolio 1 description'
    }
    console.log(JSON.stringify(portfolio));
    this.portfolioService.createPortfolio(portfolio).then((createdPortfolio: Portfolio) => {
      console.log(JSON.stringify(createdPortfolio));
    });
  }

}

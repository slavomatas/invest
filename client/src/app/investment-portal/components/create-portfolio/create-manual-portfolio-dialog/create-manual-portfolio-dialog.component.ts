import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { Portfolio } from '../../../types/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'invest-app-create-manual-portfolio-dialog',
  templateUrl: './create-manual-portfolio-dialog.component.html',
  styleUrls: ['./create-manual-portfolio-dialog.component.scss']
})
export class CreateManualPortfolioDialogComponent implements OnInit {

  DEFAULT_PORTFOLIO_ID = 0;

  portfolio: Portfolio = {
    id: this.DEFAULT_PORTFOLIO_ID,
    name: '',
    description: ''
  };

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateManualPortfolioDialogComponent>,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl([
        Validators.required
      ]),
      description: new FormControl()
  });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.portfolioService.createPortfolio(this.portfolio).then((createdPortfolio: Portfolio) => {
      console.log(JSON.stringify(createdPortfolio));
    });
    this.dialogRef.close();
  }

}

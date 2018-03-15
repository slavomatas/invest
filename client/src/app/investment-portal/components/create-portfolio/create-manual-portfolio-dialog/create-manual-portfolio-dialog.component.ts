import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { Portfolio } from '../../../types/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';
import { Router } from '@angular/router';

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
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private router: Router
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
      this.actions.addPortfolio(createdPortfolio);
      const route = 'portfolios/' + createdPortfolio.id + '/overview';
      this.router.navigate([route]);
    });
    this.dialogRef.close();
  }

}

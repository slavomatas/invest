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

  createFormErrors: any;
  formError: {
    active: Boolean;
    message: String;
  };

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateManualPortfolioDialogComponent>,
    private portfolioService: PortfolioService,
    private actions: PortfolioActions,
    private router: Router
  ) {

    this.createFormErrors = {
      name: {}
    };
    this.formError = {
      active  : false,
      message : ''
    };
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl(this.portfolio.name, [
        Validators.required
      ]),
      description: new FormControl(this.portfolio.description)
    });

    this.createForm.valueChanges.subscribe(() => {
      this.onCreateFormValuesChanged();
    });
  }

  onCreateFormValuesChanged()
  {
    for ( const field in this.createFormErrors )
    {
        if ( !this.createFormErrors.hasOwnProperty(field) )
        {
            continue;
        }

        // Clear previous errors
        this.createFormErrors[field] = {};

        // Get the control
        const control = this.createForm.get(field);

        if ( control && control.dirty && !control.valid )
        {
            this.createFormErrors[field] = control.errors;
        }
    }
    this.formError.active = false;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.portfolioService.createPortfolio(this.portfolio).then((createdPortfolio: Portfolio) => {
      this.actions.addPortfolio(createdPortfolio);
      const route = 'portfolios/' + createdPortfolio.id + '/overview';
      this.router.navigate([route]);
      this.dialogRef.close();
    })
    // Check for an error on request
    .catch((response: Response | any) => {
      if (response instanceof Response) {
          return Promise.reject(response);
      } else {
          switch (response.status){
              case 400: // Bad request
                  this.formError.message = response.error.error_description != null ? response.error.error_description : 'Something went wrong!';
                  this.formError.active = true;
                  break;
              case 504: // Bad gateway
                  this.formError.message = 'Failed to connect to server!';
                  this.formError.active = true;
                  break;
              default:
                  this.formError.message = 'Something went wrong!';
                  this.formError.active = true;
          }
      } 

      return Promise.resolve(response);
    });
  }

}

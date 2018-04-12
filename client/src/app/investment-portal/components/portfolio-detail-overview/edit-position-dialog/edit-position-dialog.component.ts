import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Portfolio, PortfolioPosition, TransactionTypes, PortfolioDetails, Trade, Security} from '../../../types/types';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PortfolioService } from '../../../services/portfolio/portfolio.service';
import { PortfolioActions } from '../../../store/actions/portfolio-actions';
import { updateTradeInPortfolio } from '../../../utils/portfolio-utils';
import * as moment from 'moment';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'invest-app-edit-position-dialog',
  templateUrl: './edit-position-dialog.component.html',
  styleUrls: ['./edit-position-dialog.component.scss']
})
export class EditPositionDialogComponent implements OnInit {


  DEFAULT_TRADE_ID = 0;
  transactionTypes: TransactionTypes[] = [TransactionTypes.BUY, TransactionTypes.SELL];

  editForm: FormGroup;
  editFormErrors: any;
  date: Date;
  time: string;
  title: string;
  formError: {
    active: Boolean;
    message: String;
  };

  securityOptions: Security[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditPositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private portfolioActions: PortfolioActions,
    private portfolioService: PortfolioService
  ) {
    this.title = data.dialogTitle !== undefined ? data.dialogTitle : DialogTitle.DEFAULT;
    this.editFormErrors = {
      transactionType: {},
      symbol         : {},
      price          : {},
      amount         : {},
      date           : {},
      time           : {}
    };

    this.formError = {
      active  : false,
      message : ''
    };
  }

  ngOnInit() {
    console.log(this.data);
    this.editForm = new FormGroup({
      transactionType: new FormControl(this.data.trade.transactionType, [Validators.required]),
      symbol: new FormControl(this.data.trade.symbol, [Validators.required]),
      price: new FormControl(this.data.trade.price, [Validators.required, isNumberValidator()]),
      amount: new FormControl(this.data.trade.amount, [Validators.required, isNumberValidator()]),
      date: new FormControl(this.data.trade.timestamp, [Validators.required]),
      time: new FormControl(this.data.trade.timestamp, [Validators.required])
    });

    this.editForm.valueChanges.subscribe(() => {
      this.onEditFormValuesChanged();
    });

    this.date = new Date(this.data.trade.timestamp);
    this.time = moment(this.data.trade.timestamp).format('HH:mm');
  }

  async inputChange(searchValue: string) {
    this.securityOptions = cloneDeep(<Security[]>await this.portfolioService.getSecuritySymbols(searchValue, 5));
  }

  displayFn(security?: Security): string | undefined {
    return security ? security.symbol : undefined;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    // set time from input
    this.date.setHours(this.getTimePart(this.time, 'hours'), this.getTimePart(this.time, 'minutes'));
    this.data.trade.timestamp = this.date.getTime();

    let realAmount = 0;
    if (this.data.trade.transactionType === TransactionTypes.BUY) {
      realAmount = this.data.trade.amount;
    } else {
      realAmount = 0 - this.data.trade.amount;
    }

    const trade: Trade = {
      tradeId: this.data.trade.tradeId,
      price: this.data.trade.price,
      amount: realAmount,
      dateTime: moment(this.data.trade.timestamp).format('YYYY-MM-DD HH:mm:ss')
    };

    switch (this.data.dialogAction){
      case DialogAction.ADD:
        this.portfolioService.createTrade(trade, this.data.portfolio.id, this.data.trade.symbol.symbol).then((createdTrade: Trade) => {
          updateTradeInPortfolio(this.data.portfolio, this.data.trade.symbol.symbol, createdTrade);
          this.portfolioActions.updatePortfolio(this.data.portfolio);
          this.dialogRef.close(this.data.trade);
        })
        // Check for an error on request
        .catch(this.handleFormError);
        break;
      case DialogAction.EDIT:
        this.portfolioService.editTrade(trade, this.data.portfolio.id, this.data.trade.symbol.symbol).then((updatedTrade: Trade) => {
          updateTradeInPortfolio(this.data.portfolio, this.data.trade.symbol.symbol, updatedTrade);
          this.portfolioActions.updatePortfolio(this.data.portfolio);
          this.dialogRef.close(this.data.trade);
        }).catch(this.handleFormError);
        break;
      default:
        // Do nothing
        break;
    }
  }

  private handleFormError = (response: Response | any) =>
  {
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
  }

  onEditFormValuesChanged()
  {
    for ( const field in this.editFormErrors )
    {
        if ( !this.editFormErrors.hasOwnProperty(field) )
        {
            continue;
        }

        // Clear previous errors
        this.editFormErrors[field] = {};

        // Get the control
        const control = this.editForm.get(field);

        if ( control && control.dirty && !control.valid )
        {
            this.editFormErrors[field] = control.errors;
        }
    }
    this.formError.active = false;
  }

  /**
   * Parses time string in HH:MM format into hours or minutes number
   * @param time string of time in HH:MM format to parse
   * @param part determines if hours or minutes should be returned
   */
  private getTimePart(time: string, part: 'hours' | 'minutes'): number {
    const array = time.split(':');
    if (array || array.length > 1) {
      const index = part === 'hours' ? 0 : 1;
      return Number.parseInt(array[index]);
    }
  }

}

export function isNumberValidator(checkInteger: boolean = false): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const isNan = isNaN(Number(control.value));
    if (checkInteger) {
      const isInt = Number.isInteger(Number(control.value));
      return isInt === false ? {'notInteger': {value: control.value}} : null;
    }
    return isNan === true ? {'notNumber': {value: control.value}} : null;
  };
}

export interface TradeFormObject {
  tradeId: number;
  transactionType: string;
  timestamp: string;
  price: number;
  amount: number;
  symbol: string;
}

/** Constants to be used as the Title in dialog component */
export enum DialogTitle {
  ADD = 'Add transaction',
  EDIT = 'Edit transaction',
  DEFAULT = 'Transaction'
}

/** Constants to be used as the Title in dialog component */
export enum DialogAction {
  ADD = 'ADD',
  EDIT = 'EDIT'
}

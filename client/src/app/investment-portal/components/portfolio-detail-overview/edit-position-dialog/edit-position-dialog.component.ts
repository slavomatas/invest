import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Portfolio, PortfolioPosition, TransactionTypes } from '../../../types/types';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'invest-app-edit-position-dialog',
  templateUrl: './edit-position-dialog.component.html',
  styleUrls: ['./edit-position-dialog.component.scss']
})
export class EditPositionDialogComponent implements OnInit {

  
  DEFAULT_TRADE_ID = 0;
  transactionTypes: TransactionTypes[] = [TransactionTypes.BUY, TransactionTypes.SELL];

  editForm: FormGroup;
  date: Date;
  time: string;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<EditPositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.dialogTitle !== undefined ? data.dialogTitle : DialogTitle.DEFAULT;
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      transactionType: new FormControl(this.data.trade.transactionType, [Validators.required]),
      symbol: new FormControl(this.data.trade.symbol, [Validators.required]),
      price: new FormControl(this.data.trade.price, [Validators.required, isNumberValidator()]),
      amount: new FormControl(this.data.trade.amount, [Validators.required, isNumberValidator()]),
      date: new FormControl(this.data.trade.timestamp, [Validators.required]),
      time: new FormControl(this.data.trade.timestamp, [Validators.required])
    });

    this.date = new Date(this.data.trade.timestamp);
    this.time = moment(this.data.trade.timestamp).format('HH:mm');
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    // set time from input
    this.date.setHours(this.getTimePart(this.time, 'hours'), this.getTimePart(this.time, 'minutes'));
    this.data.trade.timestamp = this.date.getTime();
    this.dialogRef.close(this.data.trade);
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

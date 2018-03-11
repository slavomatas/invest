import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Portfolio, PortfolioPosition, TransactionTypes } from '../../../types/types';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'invest-app-edit-position-dialog',
  templateUrl: './edit-position-dialog.component.html',
  styleUrls: ['./edit-position-dialog.component.scss']
})
export class EditPositionDialogComponent implements OnInit {

  DEFAULT_TRADE_ID = 0;
  transactionTypes: TransactionTypes[] = [TransactionTypes.BUY, TransactionTypes.SELL];

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      transactionType: new FormControl(this.data.trade.transactionType, [Validators.required]),
      symbol: new FormControl(this.data.trade.symbol, [Validators.required]),
      price: new FormControl(this.data.trade.price, [Validators.required, isNumberValidator()]),
      amount: new FormControl(this.data.trade.amount, [Validators.required, isNumberValidator(true)]),
      date: new FormControl(this.data.trade.timestamp, [Validators.required])
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.data.trade);
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

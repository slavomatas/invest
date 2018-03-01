import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Portfolio, PortfolioPosition, TransactionTypes } from '../../../types/types';

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
      transactionType: new FormControl(),
      symbol: new FormControl(),
      price: new FormControl(),
      amount: new FormControl(),
      date: new FormControl()
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.data.trade);
  }

}

export interface TradeFormObject {
  tradeId: number;
  transactionType: string;
  timestamp: string;
  price: number;
  amount: number;
  symbol: string;
}

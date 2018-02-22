import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Portfolio, PortfolioPosition } from '../../../types/types';

@Component({
  selector: 'invest-app-edit-position-dialog',
  templateUrl: './edit-position-dialog.component.html',
  styleUrls: ['./edit-position-dialog.component.scss']
})
export class EditPositionDialogComponent implements OnInit {

  DEFAULT_TRADE_ID = 0;
  transactionTypes = [
    'Buy',
    'Sell'
  ];

  trade = {
    id: this.DEFAULT_TRADE_ID,
    transactionType: this.transactionTypes[0],
    security: 'BTC',
    price: 0,
    amount: 0,
    date: Date()
  };

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPositionDialogComponent>
  ) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      transactionType: new FormControl(),
      security: new FormControl(),
      price: new FormControl(),
      amount: new FormControl(),
      date: new FormControl()
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.trade);
    this.dialogRef.close();
  }

}

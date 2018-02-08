import { Component, OnInit } from '@angular/core';
import { ClickableWidgetModel } from './clickable-widget/clickable-widget.component';
import { MatDialog } from '@angular/material';
import { CreateManualPortfolioDialogComponent } from './create-manual-portfolio-dialog/create-manual-portfolio-dialog.component';

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

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  private createManualPortfolio() {
    console.log("CREATING MANUAL PORTFOLIO");
    
    const dialogRef = this.dialog.open(CreateManualPortfolioDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

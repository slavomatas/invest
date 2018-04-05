import { Component, OnInit } from '@angular/core';
import { ClickableWidgetModel } from './clickable-widget/clickable-widget.component';
import { MatDialog } from '@angular/material';
import { CreateManualPortfolioDialogComponent } from './create-manual-portfolio-dialog/create-manual-portfolio-dialog.component';
import { fuseAnimations } from '../../../core/animations';
import { AppState } from '../../store/store';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { NgRedux } from '@angular-redux/store';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

@Component({
  selector: 'invest-app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.scss'],
  animations: fuseAnimations
})
export class CreatePortfolioComponent implements OnInit {

  widgets: ClickableWidgetModel[] = [
    {
      title: 'Create manual portfolio',
      icon: 'add_circle',
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
    const dialogRef = this.dialog.open(CreateManualPortfolioDialogComponent);
  }

}

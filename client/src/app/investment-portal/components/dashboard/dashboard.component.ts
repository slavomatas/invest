///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as slovak } from './i18n/sk';
import { fuseAnimations } from '../../../core/animations';
import { DashboardSummaryService } from '../../services/dashboard-summary/dashboard-summary.service';
import { Portfolio } from '../../types/types';
import { InvestmentActions } from '../../investment-actions';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store';


@Component({
  selector: 'fuse-invest-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
  public portfolios: Portfolio[];
  @select() readonly count$: Observable<number>;
  subscription; // <- New;

  constructor(
    private dashboardSummaryService: DashboardSummaryService,
    private translationLoader: FuseTranslationLoaderService,
    private actions: InvestmentActions,
    private ngRedux: NgRedux<AppState>
  ) {
    this.translationLoader.loadTranslations(english, slovak);


    // this.count$ = ngRedux.select<number>('count');
  }

  ngOnInit() {
    this.dashboardSummaryService.getPortfolios().then((portfolios) => {
      this.portfolios = portfolios;
    });
  }

  increment() {
    this.ngRedux.dispatch(this.actions.increment()); // <- New
  }

  decrement() {
    this.ngRedux.dispatch(this.actions.decrement()); // <- New
  }

}

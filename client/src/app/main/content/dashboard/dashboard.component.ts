///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as slovak } from './i18n/sk';
import {fuseAnimations} from '../../../core/animations';
import {DashboardSummaryService} from '../../../invest-services/dashboard-summary/dashboard-summary.service';
import {Portfolio} from '../../../types/types';


@Component({
  selector   : 'fuse-invest-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : ['./dashboard.component.scss'],
  animations   : fuseAnimations
})
export class DashboardComponent implements OnInit {
  public portfolios: Portfolio[];

  constructor(private dashboardSummaryService: DashboardSummaryService, private translationLoader: FuseTranslationLoaderService) {
      this.translationLoader.loadTranslations(english, slovak);
  }

  ngOnInit() {
    this.dashboardSummaryService.getPortfolios().then((portfolios) => {
      this.portfolios = portfolios;
    });
  }
}

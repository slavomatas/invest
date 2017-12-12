///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as slovak } from './i18n/sk';
import { fuseAnimations } from '../../../core/animations';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../store';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { PortfolioService } from '../../services/portfolio/portfolio.service';


@Component({
  selector: 'fuse-invest-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: fuseAnimations
})
export class DashboardComponent {
  constructor(
    private portfolioService: PortfolioService,
    private translationLoader: FuseTranslationLoaderService,
    private actions: PortfolioActions,
    private ngRedux: NgRedux<AppState>
  ) {

    this.translationLoader.loadTranslations(english, slovak);

  }

}

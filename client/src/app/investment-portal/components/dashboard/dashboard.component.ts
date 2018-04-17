///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as slovak } from './i18n/sk';
import { fuseAnimations } from '../../../core/animations';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { PortfolioActions } from '../../store/actions/portfolio-actions';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { AppState } from '../../store/store';
import { PortfolioDetails } from '../../types/types';
import { cloneDeep } from 'lodash';
import {MessageService} from "../../services/websocket/message.service";
import { TourService } from 'ngx-tour-md-menu';
import { demandDashboardTour, firstLoginTour } from '../../toures/tour-definitions';

@Component({
  selector: 'invest-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: fuseAnimations
})
export class DashboardComponent implements AfterViewInit {
  public static colors: string[] = ['#b71c1c', '#311b92', '#1b5e20', '#ff6f00', '#bf360c',  '#212121'];
  count = 0;
  portfolioList$ = this.ngRedux.select(state => state.portfolioList);

  constructor(
    private portfolioService: PortfolioService,
    private translationLoader: FuseTranslationLoaderService,
    private actions: PortfolioActions,
    private messageService: MessageService,
    private ngRedux: NgRedux<AppState>,
    private tourService: TourService
  ) {
    this.translationLoader.loadTranslations(english, slovak);

    this.portfolioList$.subscribe((reduxPortfolioList: PortfolioDetails[]) => {
      // if empty load from service
      if (reduxPortfolioList == null || reduxPortfolioList.length === 0) {
        const dateTo = new Date();
        const dateFrom = this.getDefaultDateFrom(dateTo);
        this.portfolioService.getPortfoliosCumulativeData('ALL').then((newPortfolioList: PortfolioDetails[]) => {
          newPortfolioList.forEach((portfolio: PortfolioDetails) => {
            portfolio.isDisplayed = true;
          });
          this.actions.getPortfolios(true, newPortfolioList);
        });
        this.actions.setCumulativeChartPeriod('ALL');
      }
    });

  }

  ngAfterViewInit() {
    if (!this.ngRedux.getState().user.firstLogin) {
      setTimeout(() => {
        this.tourService.initialize(firstLoginTour);
        this.tourService.start();
      },
      2500);

      // TODO update user.firstLogin by calling REST
      // for now we keep it without update on BE for demo purpose

      this.actions.updateUserFirstLoginFlag(true);
    }
  }

  private getDefaultDateFrom(dateTo: Date): Date {
    const dateFrom = new Date();
    dateFrom.setMonth(dateTo.getMonth() - 12);
    return dateFrom;
  }

  startTourClick() {
    this.tourService.initialize(demandDashboardTour);
    this.tourService.start();
  }
}

import * as Raven from 'raven-js';
import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { InvestmentPortalModule } from './investment-portal/investment-portal.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoggingService } from './investment-portal/services/logging/logging.service';

Raven
  .config('https://7ece5aae6fdd496fad129dc5793641f2@sentry.io/283250')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'investment-portal'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        NgbModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        InvestmentPortalModule,
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        /*{ provide: ErrorHandler, useClass: RavenErrorHandler },*/
        LoggingService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

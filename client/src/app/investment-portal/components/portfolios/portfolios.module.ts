import { NgModule } from '@angular/core';
import {PortfoliosComponent} from './portfolios.component';
import {SharedModule} from '../../../core/modules/shared.module';
import {RouterModule} from '@angular/router';
import { AuthComponent } from '../auth/auth.component';

const routes = [
  {
    path     : 'portfolios',
    component: PortfoliosComponent
  },
  {
    path: 'verify/:token',
    component: AuthComponent
  }
];

@NgModule({
  declarations: [
    PortfoliosComponent
  ],
  imports     : [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports     : [
    PortfoliosComponent
  ]
})
export class PortfoliosModule { }

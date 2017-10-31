import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';

import { PortfoliosComponent } from './portfolios.component';

const routes = [
  {
    path     : 'portfolios',
    component: PortfoliosComponent
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

export class PortfoliosModule
{

}

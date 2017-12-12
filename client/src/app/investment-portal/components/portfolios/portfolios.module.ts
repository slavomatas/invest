import { NgModule } from '@angular/core';
import { PortfoliosComponent } from './portfolios.component';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthRootComponent } from '../authentication/auth-root/auth-root.component';

const routes = [
  {
    path: 'portfolios',
    component: PortfoliosComponent
  },
];

@NgModule({
  declarations: [
    PortfoliosComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PortfoliosComponent
  ]
})
export class PortfoliosModule { }

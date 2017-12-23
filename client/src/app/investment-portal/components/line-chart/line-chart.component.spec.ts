import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import { LineChartComponent } from './line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../../core/modules/shared.module';
import { PortfolioService, MockPortfolioService } from '../../../services/portfolio/portfolio.service';


describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  const routes: Routes = [{
    path: '',
    children: [
    ]
}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxChartsModule, RouterModule.forRoot(routes), BrowserAnimationsModule, SharedModule],
      declarations: [ LineChartComponent ],
      providers: [
        {
          provide: PortfolioService,
          useFactory: () =>  new MockPortfolioService()
        },
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

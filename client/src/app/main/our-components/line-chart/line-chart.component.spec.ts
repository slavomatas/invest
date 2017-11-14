import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import { LineChartComponent } from './line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MockDashboardSummaryService, DashboardSummaryService } from '../../../invest-services/dashboard-summary/dashboard-summary.service';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  const routes: Routes = [{
    path: '',
    children: [
        { path: '404', redirectTo: '/' },
        { path: '**', redirectTo: '/' }
    ]
}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxChartsModule, RouterModule.forRoot(routes), BrowserAnimationsModule],
      declarations: [ LineChartComponent ],
      providers: [
        {
          provide: DashboardSummaryService,
          useFactory: () =>  new MockDashboardSummaryService()
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

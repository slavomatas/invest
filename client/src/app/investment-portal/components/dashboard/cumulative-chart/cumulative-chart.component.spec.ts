import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeChartComponent } from './cumulative-chart.component';

describe('CumulativeChartComponent', () => {
  let component: CumulativeChartComponent;
  let fixture: ComponentFixture<CumulativeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartReturnsComponent } from './cumulative-line-chart-returns.component';

describe('LineChartReturnsComponent', () => {
  let component: LineChartReturnsComponent;
  let fixture: ComponentFixture<LineChartReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

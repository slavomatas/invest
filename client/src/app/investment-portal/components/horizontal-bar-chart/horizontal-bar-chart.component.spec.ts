import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultibarHorizontalChartComponent } from './horizontal-bar-chart.component';

describe('MultibarHorizontalChartComponent', () => {
  let component: MultibarHorizontalChartComponent;
  let fixture: ComponentFixture<MultibarHorizontalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultibarHorizontalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultibarHorizontalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPortfolioListComponent } from './dashboard-portfolio-list.component';

describe('DashboardPortfolioListComponent', () => {
  let component: DashboardPortfolioListComponent;
  let fixture: ComponentFixture<DashboardPortfolioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPortfolioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPortfolioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

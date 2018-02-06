import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioListRowComponent } from './portfolio-list-row.component';

describe('PortfolioListRowComponent', () => {
  let component: PortfolioListRowComponent;
  let fixture: ComponentFixture<PortfolioListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

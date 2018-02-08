import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManualPortfolioDialogComponent } from './create-manual-portfolio-dialog.component';

describe('CreateManualPortfolioDialogComponent', () => {
  let component: CreateManualPortfolioDialogComponent;
  let fixture: ComponentFixture<CreateManualPortfolioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateManualPortfolioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManualPortfolioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableWidgetListComponent } from './clickable-widget-list.component';

describe('ClickableWidgetListComponent', () => {
  let component: ClickableWidgetListComponent;
  let fixture: ComponentFixture<ClickableWidgetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableWidgetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableWidgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

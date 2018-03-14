import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableWidgetListComponent } from './clickable-widget-list.component';
import { ClickableWidgetComponent } from '../clickable-widget/clickable-widget.component';
import { MaterialModule } from '../../../../core/modules/material.module';

describe('ClickableWidgetListComponent', () => {
  let component: ClickableWidgetListComponent;
  let fixture: ComponentFixture<ClickableWidgetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableWidgetListComponent, ClickableWidgetComponent ],
      imports: [ MaterialModule ]
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

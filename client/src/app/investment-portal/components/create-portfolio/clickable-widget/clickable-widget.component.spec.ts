import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableWidgetComponent } from './clickable-widget.component';

describe('ClickableWidgetComponent', () => {
  let component: ClickableWidgetComponent;
  let fixture: ComponentFixture<ClickableWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

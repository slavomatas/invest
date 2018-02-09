import { Component, OnInit, Input } from '@angular/core';
import { ClickableWidgetModel } from '../clickable-widget/clickable-widget.component';

@Component({
  selector: 'invest-app-clickable-widget-list',
  templateUrl: './clickable-widget-list.component.html',
  styleUrls: ['./clickable-widget-list.component.scss']
})
export class ClickableWidgetListComponent implements OnInit {

  @Input() widgets: ClickableWidgetModel[];

  constructor() { }

  ngOnInit() {
  }

}

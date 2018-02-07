import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clickable-widget',
  templateUrl: './clickable-widget.component.html',
  styleUrls: ['./clickable-widget.component.scss']
})
export class ClickableWidgetComponent implements OnInit {

  @Input() widgetModel: ClickableWidgetModel;

  constructor() { }

  ngOnInit() {
  }

  private onClick(event: MouseEvent) {
    this.widgetModel.buttonClick(event);
  }

}

export interface ClickableWidgetModel {
  title: string;
  icon: string;
  buttonClick: Function;
}

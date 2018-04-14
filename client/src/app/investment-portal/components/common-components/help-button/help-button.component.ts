import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'invest-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss']
})
export class HelpButtonComponent implements OnInit {
  @Output() clickEvent: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  btnClick() {
    this.clickEvent.emit();
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageType } from '../../../message-bar.service';

@Component({
  selector: 'invest-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Output() closeClicked = new EventEmitter();
  @Input() message: MessageType;

  constructor() { }

  ngOnInit() {
  }

  onCloseClick() {
    this.closeClicked.emit(this.message.id);
  }

}

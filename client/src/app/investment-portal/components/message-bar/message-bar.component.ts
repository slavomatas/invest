import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageBarService } from '../../message-bar.service';

@Component({
  selector: 'invest-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {

  public get messages() { return this.messageService.messages; }

  constructor(private messageService: MessageBarService) { }

  ngOnInit() {
  }

  closeClicked(messageID: number) {
    this.messageService.removeMessage(messageID);
  }

}

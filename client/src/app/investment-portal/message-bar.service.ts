import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';

export interface MessageType {
  text: string;
  id: number;
  state?: string;
}

@Injectable()
export class MessageBarService {
  messages: MessageType[] = [];

  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.removeAllMessages();
      }
    });
  }

  addMessage(messageText: string) {
    const newMessage: MessageType = {
      text: messageText,
      id: this.messages.length + 1,
      state: 'active'
    };

    this.messages.push(newMessage);

    setTimeout(
      () => {
        this.removeMessage(newMessage.id);
      },
      5000
    );
  }

  removeMessage(messageID: number) {
    _.remove(this.messages, message => message.id === messageID);
  }

  removeAllMessages() {
    this.messages = [];
  }

}

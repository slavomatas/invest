import { Injectable } from '@angular/core';
import * as _ from 'lodash';

export interface MessageType {
  text: string;
  id: number;
}

@Injectable()
export class MessageBarService {
  messages: MessageType[] = [
    {
      id: 7,
      text: 'nehehe'
    },
    {
      id: 5,
      text: 'blabla'
    }
  ];

  constructor() { }

  addMessage(messageText: string) {
    const newMessage: MessageType = {
      text: messageText,
      id: this.messages.length + 1
    };

    this.messages.push(newMessage);
  }

  removeMessage(messageID: number) {
    _.remove(this.messages, message => message.id === messageID);
  }

  removeAllMessages() {
    this.messages = [];
  }

}

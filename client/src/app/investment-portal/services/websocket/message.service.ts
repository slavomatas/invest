import {Injectable} from '@angular/core';
import {Client, Frame, Message} from "stompjs";

import * as stompjs from 'stompjs';
import * as SockJS from "sockjs-client";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessageService {

  private messageSource = new Subject<string>();
  messageReceived$ = this.messageSource.asObservable();


  stompClient: Client;

  constructor() {
    const socket = new SockJS('api/socket') as WebSocket;
    this.stompClient = stompjs.over(socket);
    this.stompClient.connect({}, (frame: Frame) => {
      this.stompClient.subscribe('/app/chat', (message: Message) => {
        this.onMessage(message);
      });
    });
  }

   public sendMessage(message) {
      this.stompClient.send('/app/chat', {}, message);
   }


  private onMessage(message: Message) {
    console.log('Received message:', message.body);
    let json = JSON.parse(message.body);
    this.messageSource.next(json['content']);
  }


}

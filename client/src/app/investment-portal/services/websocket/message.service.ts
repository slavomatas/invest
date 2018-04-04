import {Injectable} from '@angular/core';
import {Client, Frame, Message} from 'stompjs';
import * as stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Subject} from 'rxjs/Subject';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/store';
import { User } from '../../types/types';
import { Token } from '../../types/authentication-types';

@Injectable()
export class MessageService {

  private messageSource = new Subject<string>();
  messageReceived$ = this.messageSource.asObservable();

  stompClient: Client;

  token$ = this.ngRedux.select(state => state.token);
  userToken;

  constructor(
    private ngRedux: NgRedux<AppState>
  ) {
    const socket = new SockJS('api/socket') as WebSocket;
    this.stompClient = stompjs.over(socket);
    this.stompClient.connect({}, (frame: Frame) => {
      this.stompClient.subscribe('/user/queue/messages', (message: Message) => {
        this.onMessage(message);
      });
    });

    this.token$.subscribe((data: Token) => {
      if (data != null) {
        this.userToken = data.access_token;
      }
    });
  }

   public sendMessage(message) {
      this.stompClient.send('/app/send/message', {'email': this.userToken}, message);
   }


  private onMessage(message: Message) {
    console.log('Received message:', message.body);
  }


}

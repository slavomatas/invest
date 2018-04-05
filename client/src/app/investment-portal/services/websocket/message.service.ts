import { Injectable } from '@angular/core';
import { Client, Frame, Message } from 'stompjs';
import * as stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs/Subject';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/store';
import { User } from '../../types/types';
import { PortfolioService } from '../portfolio/portfolio.service';
import { MessageBarService } from '../../message-bar.service';

@Injectable()
export class MessageService {
  self = this;

  private messageSource = new Subject<string>();
  messageReceived$ = this.messageSource.asObservable();

  stompClient: Client;

  user$ = this.ngRedux.select(state => state.user);
  userEmail;
  messageId: number = null;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private portfolioService: PortfolioService,
    private messageBarService: MessageBarService
  ) {
    this.user$.subscribe((data: User) => {
      if (data != null) {
        this.userEmail = data.email;
      }
    });
  }

  public connect() {
    const socket = new SockJS('api/socket') as WebSocket;
    this.stompClient = stompjs.over(socket);
    this.stompClient.connect({}, (frame: Frame) => {
      this.stompClient.subscribe('/user/queue/messages', (message: Message) => {
        this.onMessage(message);
      });
      if (this.messageId != null) {
        this.messageBarService.removeMessage(this.messageId);
        this.messageId = null;
      }
      this.subscribeToDefaults();
    }, () => {
      if (this.messageId == null) {
        this.messageId = this.messageBarService.addMessage('Disconnected');
      }
      setTimeout(() => {
        this.connect();
      }, 5000);
    });

    socket.onerror = () => {
      if (this.messageId == null) {
        this.messageId = this.messageBarService.addMessage('Disconnected');
      }
      this.connect();
    };
  }

   public sendMessage(message) {

      this.stompClient.send('/app/send/message', {'email': this.userEmail, 'user':
      JSON.stringify(this.ngRedux.getState().user)}, message);
   }

  public subscribeToDefaults() {
    this.sendMessage('{"command":"subscribe_to","values":[{"event":"portfolios_change"}]}');
  }

  private onMessage(message: Message) {
    const command = JSON.parse(message.body);
    switch (command.command) {
      case 'update_portfolio': {
        const portfolioId = command.portfolio_id;
        this.portfolioService.refreshPortfolioData(Number.parseInt(portfolioId));
        break;
      }
      default: {
        break;
      }
    }
  }


}

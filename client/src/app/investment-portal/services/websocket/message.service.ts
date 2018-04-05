import { Injectable } from '@angular/core';
import { Client, Frame, Message } from 'stompjs';
import * as stompjs from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs/Subject';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/store';
import { User } from '../../types/types';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class MessageService {

  private messageSource = new Subject<string>();
  messageReceived$ = this.messageSource.asObservable();

  stompClient: Client;

  user$ = this.ngRedux.select(state => state.user);
  userEmail;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private portfolioService: PortfolioService
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
      this.subscribeToDefaults();
    });
  }

   public sendMessage(message) {

      this.stompClient.send('/app/send/message', {'email': this.userEmail, 'user':
      JSON.stringify(this.ngRedux.getState().user)}, message);
      console.log(JSON.stringify(this.ngRedux.getState().user));
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

import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message, MessageService } from '../messages';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-chat-input-bar',
  templateUrl: './chat-input-bar.component.html',
  styleUrls: ['./chat-input-bar.component.css'],
  providers: [MessageService],
})
export class ChatInputBarComponent {
  messageText: string = '';

  id: number = 1;

  @Output() addMessageNotify = new EventEmitter();

  @Output() sbj = new Subject<Message>();

  messageServ: MessageService;

  constructor(private mesgServ: MessageService) {
    this.messageServ = mesgServ;
  }

  async sendMessage(): Promise<void> {
    let token = localStorage.getItem('token');

    this.mesgServ.addMessage(1, this.messageText);
    //this.messageText = '';

    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7047/chat', {
        accessTokenFactory: () => token as string,
      })
      .build();
    await hubConnection.start();
    hubConnection.invoke('Send', this.messageText);
    //await hubConnection.stop();
  }
}

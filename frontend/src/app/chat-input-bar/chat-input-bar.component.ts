import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message, MessageService } from '../messages';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat-input-bar',
  templateUrl: './chat-input-bar.component.html',
  styleUrls: ['./chat-input-bar.component.css'],
  providers: [MessageService],
})
export class ChatInputBarComponent implements OnInit {
  messageText: string = '';

  connection!: signalR.HubConnection;

  @Output() addMessageNotify = new EventEmitter();

  @Output() sbj = new Subject<Message>();

  messageServ: MessageService;

  constructor(
    private mesgServ: MessageService,
    private authService: AuthService
  ) {
    this.messageServ = mesgServ;
  }
  async ngOnInit(): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      // DOCKER URL 'https://localhost:7001/chat'
      // LOCAL URL 'https://localhost:7047/chat'
      .withUrl('https://localhost:7001/chat', {
        accessTokenFactory: () => this.authService.token,
      })
      .build();
    await this.connection.start();
    this.connection.on('Send', (data) => {
      if ((data as Message).senderId === this.authService.userId)
        (data as Message).isMine = true;
      this.mesgServ.addMessage(data as Message);
    });
  }

  async sendMessage(): Promise<void> {
    let token = localStorage.getItem('token');

    this.connection.send('Send', this.messageText);
    // this.mesgServ.addMessage(
    //   new Message(this.authService.userId, this.messageText)
    // );
    this.messageText = '';
  }
}

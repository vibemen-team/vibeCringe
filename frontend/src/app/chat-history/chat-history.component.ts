import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message, MessageService } from '../messages';
import { MessageHistoryService } from '../message-history.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  providers: [MessageService],
})
export class ChatHistoryComponent implements OnInit {
  messages$!: Observable<Message[]>;
  constructor(
    public mesgServ: MessageService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.messages = mesgServ.messages;

    this.http
      .get<Message[]>('https://localhost:7001/Message', {
        headers: { Authorization: 'Bearer ' + this.authService.token },
      })
      .subscribe((response) => {
        console.dir(response);
        response.forEach((element) => {
          mesgServ.addMessage(element);
        });
      });
  }

  @Input() messages: Array<Message> = [];

  ngOnInit(): void {}
  // @Input() messages: Array<Message> = [];
}

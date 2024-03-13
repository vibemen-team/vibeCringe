import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export class Message {
  id: string;
  messageText: string;
  isMine!: boolean;
  receiverId!: string;
  receiverName!: string;
  sendedTime!: string;
  senderId!: string;
  senderName!: string;

  constructor(senderId: string, messageText: string) {
    this.id = '';
    this.messageText = messageText;
    this.isMine = false;
    this.receiverId = '';
    this.receiverName = '';
    this.sendedTime = '';
    this.senderId = senderId;
    this.senderName = '';
  }
}

@Injectable()
export class MessageService {
  messages: Message[] = messages;

  constructor() {}

  addMessage(message: Message): void {
    console.dir(this.messages);
    this.messages.push(message);
  }
}

export const messages: Message[] = [
  // {
  //   id: 1,
  //   text: 'Message 1',
  // },
  // {
  //   id: 1,
  //   text: 'Message 2',
  // },
  // {
  //   id: 2,
  //   text: 'Message 3',
  // },
];

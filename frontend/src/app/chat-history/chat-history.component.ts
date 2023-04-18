import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import { Message, MessageService } from '../messages';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  providers: [MessageService]
})
export class ChatHistoryComponent {
  /**
   *
   */
  constructor(private mesgServ:MessageService) {
    this.messages=mesgServ.messages;
  }
    @Input() messages: Array<Message>=[];
}

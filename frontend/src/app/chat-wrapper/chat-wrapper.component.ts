import { Component } from '@angular/core';
import { messages } from '../messages';
import { Message } from '../messages';

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.css']
})
export class ChatWrapperComponent {
  messages = messages;

  addMessage():void
  {
    this.messages.push(new Message(1,"zxc"));
  }
}

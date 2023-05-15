import { Component, Input } from '@angular/core';
import { Message } from '../messages';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent {
  @Input() item!: Message;
}
